interface BaseJwtToken {
    userId: string;
    role: "sv" | "gv" | "admin";
}

interface AppJwtToken extends BaseJwtToken {
    role: "app";
    appId: string;
    scope: string[];
}

type JwtToken = BaseJwtToken | AppJwtToken;