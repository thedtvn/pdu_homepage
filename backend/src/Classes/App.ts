import express from "express";
import { createServer } from "http";
import fs from "fs";
import { join } from "path";
import multer  from "multer";
import Route from "./Routes";
import Connect from "../Databases/Connecter";

export default class App {
    public app = express();
    public httpServer = createServer(this.app);
    private Handles = {};
    private Middlewares = [];

    async importRoutes() {
        
        for (const handle of fs.readdirSync(join(__dirname, "../Middlewares"))) {
            const handleImport = await import(`../Middlewares/${handle}`);
            this.app.use(handleImport.default);
        }

        for (const handle of fs.readdirSync(join(__dirname, "../Routes"))) {
            const handleImport = await import(`../Routes/${handle}`);
            const init_class = new handleImport.default(this) as Route;
            const path = join("/api/", init_class.path || "").replace(/\\/g, "/");
            console.log("loaded", path);
            this.app.use(path, init_class.router);
        }
    }


    public close() {
        this.httpServer.close();
    }

    public async init() {
        this.app.use(multer().array('files'));
        this.app.use(express.json());
        await this.importRoutes();
        this.app.use('/cdn/', express.static('cdn'));
        await Connect(process.env.MONGO_URL);
        this.httpServer.listen(process.env.PORT, "0.0.0.0", () => {
            console.log(`[System] Server started at port ${process.env.PORT}!`);
        });
    }

}
