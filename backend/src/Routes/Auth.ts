import { Route, default as RouteType } from "../Classes/Routes";
import { Request, Response } from "express";
import { SignJWT, jwtVerify } from 'jose';
import userModel from "../Databases/Models/User";
import { randomUUID } from "crypto";

export default class Auth extends RouteType {

    public path = "/auth";

    public static async sign(payload: any): Promise<string> {
        const secret = new TextEncoder().encode(
            process.env.JWT_TOKEN,
        )
        const alg = 'HS256'

        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg })
            .setExpirationTime('1h')
            .sign(secret)

        return jwt;
    }

    public static async verify(token: string): Promise<JwtToken | null> {
        const secret = new TextEncoder().encode(
            process.env.JWT_TOKEN,
        )
        const alg = 'HS256'
        try {
            const jwt = await jwtVerify(token, secret);
            return jwt.payload as unknown as JwtToken;
        } catch (e) {
            return null;
        }
    }

    @Route("/login", "post")
    public async login(req: Request, res: Response) {
        const { username, password, role } = req.body;
        if (!username || !password) return res.status(403).json({ error: "Thiếu Tên Người dùng" });
        if (!role || !["sv", "gv"].includes(role)) return res.status(400).json({ error: "Role không hợp lệ" });
        const role_config = role === "sv" ? "sv" : ["gv", "admin"];
        const user = await userModel.findOne({ username, password, role: role_config });
        const usernameText = role === "sv" ? "Mã sinh viên" : "Email";   
        if (!user) return res.status(403).json({ error: `${usernameText} hoặc mật khẩu sai` });

        if (user.password !== password) return res.status(403).json({ error: `${usernameText} hoặc mật khẩu sai` });

        const token = await Auth.sign({ userId: user.userId, role: user.role });

        return res.json({ token, role: user.role });
    }

    @Route("/register", "post")
    public async register(req: Request, res: Response) {
        if (req.auth?.role !== "admin") return res.status(403).json({ error: "Không có quyền truy cập" });
        const { username, password, role } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Missing username or password" });
        const role_config = role;
        const user = await userModel.findOne({ username, role: role_config });
        if (user) return res.status(400).json({ error: "User already exists" });
        const userId = randomUUID();
        await userModel.create({ username, password, role, userId });

        return res.json({ success: true });
    }

}