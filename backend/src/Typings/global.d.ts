declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // Add your environment variables here
            JWT_SECRET: string;
            MONGO_URL: string;
            PORT: string;
        }
    }

    namespace Express {
        interface Request {
            auth: JwtToken | null;
        }
    }

    interface String {
        toSlug(): string;
    }

}

export { }