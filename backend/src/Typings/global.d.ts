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
            fields: { [key: string]: string };
            files: { [key: string]: File };
        }
    }

    interface File {
        size: number;
        path: string;
        name: string;
        type: string;
        hash: string | null;
        lastModifiedDate: Date;
        _writeStream: WriteStream;
    }

    interface String {
        toSlug(): string;
    }

}

export { }