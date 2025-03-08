import { model, Schema } from "mongoose";

const files = new Schema({
    postId: { type: String, required: true },
    fileName: { type: String, required: true },
    fileID: { type: String, required: true, unique: true },
    filePathName: { type: String, required: true }
});

const filesModel = model('files', files);

export default filesModel;
