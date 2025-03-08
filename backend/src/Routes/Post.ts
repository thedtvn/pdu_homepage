import { randomUUID } from "crypto";
import { Middleware, Route, default as RouteType } from "../Classes/Routes";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import filesModel from "../Databases/Models/Files";
import { File } from "formidable";
import postModel, { tagModel } from "../Databases/Models/Post";

export default class Post extends RouteType {

    public path = "/post";

    @Route("/getPosts", "get")
    public async getPosts(req: Request, res: Response) {
        let { tag, page, q } = req.query;
        let query = {};
        if (tag) query = { tags: { $elemMatch: { tag: String(tag) } } };
        if (q) query = { $or: [{ title: { $regex: q, $options: "i" } }, { content: { $regex: q, $options: "i" } }] };
        const pageInt = Number.isNaN(Number(page)) ? 1 : Number(page);
        const posts = await postModel.find(query)
            .sort({ createdAt: -1 })
            .skip((pageInt - 1) * 10)
            .limit(10);
        return res.json(posts.map(post => ({
            postId: post.postId,
            title: post.title,
            content: post.content,
            tags: post.tags.map(tag => tag.tag),
        })));
    }

    @Route("/getPost/:postId", "get")
    public async getPostById(req: Request, res: Response) {
        const { postId } = req.params;
        const post = await postModel.findOne({ postId });
        if (!post) return res.status(404).json({ error: "Post not found" });
        return res.json({
            postId: post.postId,
            title: post.title,
            content: post.content,
            tags: post.tags.map(tag => tag.tag),
        });
    }

    @Route("/delPost", "post")
    public async delPost(req: Request, res: Response) {
        if (req.auth?.role !== "admin") return res.status(401).json({ error: "Unauthorized" });
        const { postId } = req.body;
        if (!postId) return res.status(400).json({ error: "No postId" });
        await postModel.deleteOne({ postId });
        return res.json({ postId });
    }

    @Route("/getTags", "get")
    public async getTags(req: Request, res: Response) {
        const tags = await tagModel.find();
        return res.json(tags);
    }

    @Route("/delTag", "post")
    public async delTag(req: Request, res: Response) {
        if (req.auth?.role !== "admin") return res.status(401).json({ error: "Unauthorized" });
        const { tag } = req.body;
        if (!tag) return res.status(400).json({ error: "No tag" });
        if (!tag.deleteable) return res.status(400).json({ error: "Tag not deleteable" });
        await tagModel.deleteOne({ tag });
        return res.json({ tag });
    }

    @Route("/new", "post")
    public async newPost(req: Request, res: Response) {
        if (req.auth?.role !== "admin") return res.status(401).json({ error: "Unauthorized" });
        const { title, content, fileIds, tags } = req.body;
        if (!title || !content) return res.status(400).json({ error: "Missing fields" });
        const slug = title.toSlug();
        const postId = randomUUID();
        const post = await postModel.create({ postId, title, content, files: fileIds, tags: tags.map(tag => ({ tag, slug: tag.toSlug() })) });
        return res.json({ postId, slug });
    }

    @Route("/edit", "post")
    public async editPost(req: Request, res: Response) {
        if (req.auth?.role !== "admin") return res.status(401).json({ error: "Unauthorized" });
        const { postId, title, content, fileIds } = req.body;
        if (!postId) return res.status(400).json({ error: "No postId" });
        if (!title && !content && !fileIds) return res.status(400).json({ error: "Missing field" });
        const post = await postModel.findOne({ postId });
        if (!post) return res.status(404).json({ error: "Post not found" });
        if (title) post.title = title;
        if (content) post.content = content;
        if (fileIds) post.files = fileIds;
        await post.save();
        return res.json({ postId });
    }

    @Route("/file_upload", "post")
    public async fileUpload(req: Request, res: Response) {
        if (req.auth?.role !== "admin") return res.status(401).json({ error: "Unauthorized" });
        if (!fs.existsSync("./cdn")) fs.mkdirSync("./cdn");
        if (!req.files) return res.status(400).json({ error: "No files" });
        if (!req.fields?.postId) return res.status(400).json({ error: "No postId" });
        const postId = req.fields.postId;
        const fileIds = [];
        for (let file of Object.values(req.files)) {
            const fileId = randomUUID();
            const fileExt = file.name.split(".").pop();
            const fileName = file.name;
            const filePath = `${fileId}.${fileExt}`;
            fs.renameSync(file.path, "./cdn/" + filePath);
            await filesModel.create({ postId, fileName, fileID: fileId, filePathName: filePath });
            fileIds.push({ fileId, fileName, filePath });
        }
        return res.json({ fileIds });
    }

}
