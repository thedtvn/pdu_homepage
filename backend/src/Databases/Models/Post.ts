import { model, Schema } from "mongoose";

const post = new Schema({
    postId: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    files: { type: [String], required: true },
});

const postModel = model('users', post);

export default postModel;
