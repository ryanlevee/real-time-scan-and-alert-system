import { Utl } from '../common/utility.js';
import * as extension from '../middleware/extension.js';


const extendMiddleware = async (req, res, next) => {
    await middleware.bind(middleware)(req, res, next)
}

async function middleware(req, res, next) {
    const context = new extension.Middleware(req);

    try {
        const middlewares = [
            context.validateMethod.bind(context),
            context.validatePath.bind(context),
            context.validateBody.bind(context),
            context.storePayload.bind(context),
        ];

        await middlewares.reduce(async (promise, middleware) => (
            await promise,
            await middleware()
        ), Promise.resolve());

        next();
    } catch (error) {
        error.type = this.name;
        next(error);
    }
};

export { extendMiddleware };
