import { model, Schema } from "mongoose";
import appsModel from "./Apps";
import { randomBytes, randomUUID } from "crypto";

const user = new Schema({
    userId: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["sv", "gv", "admin"], required: true },
    apps: [
        {
            appId: { type: String, required: true },
            auth_code: { type: String, require: true },
            scopes: [{ type: String, require: true }]
        }
    ]
});

const userModel = model('users', user);

export default userModel;
