import { DataHolder, ErrorHolder } from "../storage/holders.js";


class Begin {
    static async prog(req, res, next) {
        await Begin.initializeHolders(req, res, next);
        next();
    }

    static async initializeHolders(req, res, next) {
        const reqIp = req.socket?.remoteAddress;
        const reqPath = req.originalUrl;
        ErrorHolder.init(reqIp, reqPath);
        DataHolder.init();
    };
}

export { Begin };
