import { NextFunction, Request, Response } from "express";
import Auth from "../Routes/Auth";
import appsModel from "../Databases/Models/Apps";
import userModel from "../Databases/Models/User";

export default async function AuthMid(req: Request, res: Response, next: NextFunction) {
    const auth_header = req.headers.authorization;
    if (!auth_header) return next();
    req.auth = await Auth.verify(auth_header);
    if (req.auth) {
        if (req.auth.role == "app") {
            let app = await appsModel.findOne({ appId: req.auth.appId });
            if (!app) return res.status(401).json({ error: "Unauthorized" });
            let user = await userModel.findOne({ userId: req.auth.userId });
            if (!user) return res.status(401).json({ error: "Unauthorized" });
            if (!user.apps.find(x => x.appId == app.appId && req.auth.iss == x.auth_code)) return res.status(401).json({ error: "Unauthorized" });
        }
    }
    next();
}