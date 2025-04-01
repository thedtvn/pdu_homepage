import { Middleware, Route, default as RouteType } from "../Classes/Routes";
import { NextFunction, Request, Response } from "express";
import Caches from "../Utils/Caches";
import appsModel from "../Databases/Models/Apps";
import Auth from "./Auth";
import userModel from "../Databases/Models/User";
import { randomBytes, randomUUID } from "crypto";

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

    @Route("/deauthorize", "post")
    public async deauthorize(req: Request, res: Response) {
        if (!req.auth) return res.status(401).json({ error: "Unauthorized" });
        const { app_id } = req.body;
        if (!app_id) return res.status(400).json({ error: "Invalid app_id" });
        const user = await userModel.findOne({
            userId: req.auth.userId
        });
        if (!user) return res.status(400).json({ error: "Invalid user" });
        user.apps.pull({ appId: app_id });
        await user.save();
        res.status(200).json({});
    }

    @Route("/authorized", "get")
    public async getAuthorized(req: Request, res: Response) {
        if (!req.auth) return res.status(401).json({ error: "Unauthorized" });
        const user = await userModel.findOne({
            userId: req.auth.userId
        });
        if (!user) return res.status(400).json({ error: "Invalid user" });
        const appsP = user.apps.map(async x => {
            const app = await appsModel.findOne(
                {appId: x.appId}
            );
            return app;
        });
        let apps = await Promise.all(appsP);
        apps = apps.filter(x => x);
        res.json(apps);
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
        const user = await userModel.findOne({ userId: codeInfo.userID });
        if (!user) return res.status(400).json({ error: "Invalid code" });
        let authCode: { appId: String, auth_code: String } = user.apps.find(app => app.appId === app_id) as any;
        if (!authCode) {
            authCode = { appId: app_id, auth_code: randomUUID().toString() };
            user.apps.push(authCode);
            user.save();
        }
        const accessToken = await Auth.sign({ 
            appId: app_id, 
            userId: codeInfo.userID, 
            iss: authCode.auth_code, 
            role: "app", 
            scope: codeInfo.scopes });
        return res.json({ access_token: accessToken });
    }

    @Route("/create_app", "post")
    public async createApp(req: Request, res: Response) {
        if (req.auth?.role !== "admin") return res.status(401).json({ error: "Unauthorized" });
        const { app_name, redirect_uri } = req.body;
        const app_id = randomBytes(16).toString("hex");
        const app_secret = randomBytes(32).toString("hex");
        const app = new appsModel({
            appId: app_id,
            appName: app_name,
            appSecret: app_secret,
            appRedirectUri: redirect_uri
        });
        await app.save();
        return res.json({ app_id, app_secret });
    }

    @Route("/delete_app", "post")
    public async deleteApp(req: Request, res: Response) {
        if (req.auth?.role != "admin") return res.status(401).json({ error: "Unauthorized" });
        const { app_id } = req.body;
        await appsModel.deleteOne({ appId: app_id });
        return res.json({});
    }

    @Route("/apps", "get")
    public async getApps(req: Request, res: Response) {
        if (req.auth?.role !== "admin") return res.status(401).json({ error: "Unauthorized" });
        const apps = await appsModel.find();
        return res.json(apps);
    }
}