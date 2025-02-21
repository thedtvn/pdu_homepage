import { Middleware, Route, default as RouteType } from "../Classes/Routes";
import { NextFunction, Request, Response } from "express";

export default class Login extends RouteType {

    public path = "/auth";

    @Middleware()
    public async middleware(req: Request, res: Response, next: NextFunction) {
        // do something
        next();
    }

    @Route("/login", "all")
    public async login(req: Request, res: Response) {
        // do something
        console.log("login");
        res.send("login");
    }

}