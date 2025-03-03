import { Route, default as RouteType } from "../Classes/Routes";
import { Request, Response } from "express";
import jose from 'jose'
import userModel from "../Databases/Models/User";

export default class OAuth2 extends RouteType {

    public path = "/auth";

    public static async sign(payload: any): Promise<string> {
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET,
        )
        const alg = 'HS256'

        const jwt = await new jose.SignJWT(payload)
            .setProtectedHeader({ alg })
            .setExpirationTime('4w')
            .sign(secret)

        return jwt;
    }

    public static async verify(token: string): Promise<JwtToken | null> {
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET,
        )
        const alg = 'HS256'
        try {
            const jwt = await jose.jwtVerify(token, secret);
            return jwt.payload as unknown as JwtToken;
        } catch (e) {
            return null;
        }
    }

    @Route("/", "post")
    public async login(req: Request, res: Response) {
        const { username, password, role } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Missing username or password" });
        if (!role || !["sv", "gv"].includes(role)) return res.status(400).json({ error: "Invalidate role" });
        const role_config = role === "sv" ? "sv" : ["gv", "admin"];
        const user = await userModel.findOne({ username, password, role: role_config });
        if (!user) return res.status(400).json({ error: "Invalid username or password" });

        if (user.password !== password) return res.status(400).json({ error: "Invalid username or password" });

        const token = await this.sign({ userId: user.userId, role: user.role });

        return res.json({ token });
    }

}