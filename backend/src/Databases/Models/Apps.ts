import { model, Schema } from "mongoose";

const apps = new Schema({
    appId: { type: String, required: true, unique: true },
    appName: { type: String, required: true },
    appSecret: { type: String, required: true },
    appRedirectUri: [{ type: String }],
    verify: { type: Boolean, default: false },
    owner: { type: String, required: true }
});

const appsModel = model('apps', apps);

export default appsModel;
