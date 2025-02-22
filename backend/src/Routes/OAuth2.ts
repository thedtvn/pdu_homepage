import { Middleware, Route, default as RouteType } from "../Classes/Routes";
import { NextFunction, Request, Response } from "express";

export default class OAuth2 extends RouteType {

    public path = "/oauth2";

    @Middleware()
    public async middleware(req: Request, res: Response, next: NextFunction) {
        
        next();
    }

    @Route("/", "all")
    public async login(req: Request, res: Response) {
        
        res.send("login");
    }

}