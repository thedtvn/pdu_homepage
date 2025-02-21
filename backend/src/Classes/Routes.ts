import { Router, Request, Response, NextFunction } from "express";
import App from "./App";

export default class Route {
    public router: Router;

    public path?: string; 

    public app: App;

    constructor(app: App) {
        this.app = app;
        if (!(this.router instanceof Router)) this.router = Router();
        const classMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        for (const method of classMethods) {
            const methodData = this[method] as RouteHandlerWithMeta & MiddlewareHandlerWithMeta;
            if (!methodData) continue;
            if (methodData.is_middleware) {
                const middleware = methodData as MiddlewaresHandler;
                const args = [];
                if (methodData.middleware) args.push(methodData.middleware);
                args.push(middleware);
                this.router.use(...args);
                continue;
            }
            if (!methodData.path || !methodData.method) continue;
            const proxy = (req: Request, res: Response, next: NextFunction) => { methodData.apply(this, [req, res, next]) };
            this.router[methodData.method](methodData.path, proxy);
        }
    }
}

type httpMethods = 'get' | 'post' | 'put' | 'head' | 'delete' | 'options' | 'trace' | 'copy' | 'lock' | 'mkcol' | 'move' | 'purge' | 'propfind' | 'proppatch' | 'unlock' | 'report' | 'mkactivity' | 'checkout' | 'merge' | 'm-search' | 'notify' | 'subscribe' | 'unsubscribe' | 'patch' | 'search' | 'connect';

type RouteHandler = ((req: Request, res: Response) => any);
type MiddlewaresHandler = ((req: Request, res: Response, next: NextFunction) => any);

interface RouteHandlerWithMeta extends RouteHandler {
    path?: string;
    method?: httpMethods | "all";
}

interface MiddlewareHandlerWithMeta extends MiddlewaresHandler {
    is_middleware?: boolean;
    middleware?: string | null;
}

function RouterDecore(path: string, method: "all" | httpMethods ) {
    return (target: any, memberName: string, propertyDescriptor: TypedPropertyDescriptor<RouteHandlerWithMeta>) => {
      const fn = propertyDescriptor.value as RouteHandlerWithMeta;
      fn.path = path;
      fn.method = method;
    }
};

function Middleware(path: string = null) {
    return (target: any, memberName: string, propertyDescriptor: TypedPropertyDescriptor<MiddlewareHandlerWithMeta>) => {
        const fn = propertyDescriptor.value as MiddlewareHandlerWithMeta;
        fn.middleware = path;
        fn.is_middleware = true;
    }
};

export { RouterDecore as Route, Middleware };
