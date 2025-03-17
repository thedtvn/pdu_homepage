import { model, Schema } from "mongoose";

const post = new Schema({
    postId: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    files: { type: [{
        fileId: { type: String, required: true },
        fileName: { type: String, required: true },
        filePath: { type: String, required: true },
        isDefault: { type: Boolean, default: false }
    }], required: true },
    tags: [{ type: String, required: true  }],
    created: { type: Date, default: Date.now },
});

const postModel = model('posts', post);

export default postModel;