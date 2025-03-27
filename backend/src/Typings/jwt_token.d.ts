interface BaseJwtToken {
    userId: string;
    role: "sv" | "gv" | "admin" | "app";
    appId?: string;
    scope?: string[];
    iss?: string;
}

type JwtToken = BaseJwtToken;