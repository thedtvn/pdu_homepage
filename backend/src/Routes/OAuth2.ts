import { Middleware, Route, default as RouteType } from "../Classes/Routes";
import { NextFunction, Request, Response } from "express";
import Caches from "../Utils/Caches";
import appsModel from "../Databases/Models/Apps";
import Auth from "./Auth";

export default class OAuth2 extends RouteType {

    public path = "/oauth2";

    public static scopes_list = ["user_info"];


    @Route("/authorize", "get")
    public async authorizePage(req: Request, res: Response) {
        const { app_id, scopes, redirect_url } = req.body;
        const appInfo = await appsModel.findOne({ appId: app_id });
        if (!appInfo) return res.status(400).json({ error: "Invalid app_id" });
        if (!appInfo.appRedirectUri.includes(redirect_url)) return res.status(400).json({ error: "Invalid redirect_url" });
        return res.json({ appName: appInfo.appName });
    }

    @Route("/authorize", "post")
    public async authorize(req: Request, res: Response) {
        if (!req.auth) return res.status(401).json({ error: "Unauthorized" });
        const { app_id, scopes, redirect_url } = req.body;
        const scopesList: string[] = scopes.split(" ");
        const appInfo = await appsModel.findOne({ appId: app_id });
        if (!appInfo) return res.status(400).json({ error: "Invalid app_id" });
        if (!appInfo.appRedirectUri.includes(redirect_url)) return res.status(400).json({ error: "Invalid redirect_url" });
        if (!scopesList.every((scope: string) => OAuth2.scopes_list.includes(scope))) return res.status(400).json({ error: "Invalid scopes" });
        const code = Math.random().toString(36).substring(7);
        const expire = (Date.now() + 120 * 1000) / 1000;
        Caches.set(`code_${code}`, { appId: app_id, userID: req.auth.userId, scopes: scopesList }, 120);
        return res.json({ code, expire });
    }

    @Route("/token", "post")
    public async token(req: Request, res: Response) {
        const { code, app_id, app_secret } = req.body;
        const codeInfo = Caches.get<AppCodeCache>(`code_${code}`);
        if (!codeInfo) return res.status(400).json({ error: "Invalid code" });
        if (codeInfo.appId !== app_id) return res.status(400).json({ error: "Invalid app_id" });
        const appInfo = appsModel.findOne({ appId: app_id, appSecret: app_secret });
        if (!appInfo) return res.status(400).json({ error: "Invalid app_id or app_secret" });

        Caches.del(`code_${code}`);

        const accessToken = await Auth.sign({ appId: app_id, userId: codeInfo.userID, role: "app", scope: codeInfo.scopes });
        return res.json({ access_token: accessToken });
    }

}