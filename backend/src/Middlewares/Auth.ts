import { NextFunction, Request, Response } from "express";

export default async function Auth(req: Request, res: Response, next: NextFunction) {
    // todo: implement auth
    next();
}