import { model, Schema } from "mongoose";

const tag = new Schema({
    tag: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    deleteable: { type: Boolean, default: true },
});

const post = new Schema({
    postId: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    files: { type: [String], required: true },
    tags: { type: [tag], required: true },
    created: { type: Date, default: Date.now },
});

const postModel = model('posts', post);

const tagModel = model('tags', tag);

export default postModel;
export { tagModel };
