import { NextFunction, Request, Response } from "express";
import Auth from "../Routes/Auth";

export default async function AuthMid(req: Request, res: Response, next: NextFunction) {
    const auth_header = req.headers.authorization;
    if (!auth_header) return next();
    req.auth = await Auth.verify(auth_header);
    next();
}