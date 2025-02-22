
import { model, Schema } from "mongoose";

const user = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["sv", "gv", "admin"], required: true }
});

const userModel = model('users', user);

export default userModel;
