import { Route, default as RouteType } from "../Classes/Routes";
import { Request, Response } from "express";
import { SignJWT, jwtVerify } from 'jose';
import userModel from "../Databases/Models/User";
import { randomUUID } from "crypto";

export default class Auth extends RouteType {

    public path = "/@me";

    @Route("/info", "get")
    public async me(req: Request, res: Response) {
        if (!req.auth) return res.status(403).json({ error: "Unauthorized" });
        const user = await userModel.findOne({ userId: req.auth.userId });
        if (!user) return res.status(403).json({ error: "Unauthorized" });
        return res.json({
            userId: user.userId,
            fullname: user.fullname,
            username: user.username,
            role: user.role
        });
    }
}