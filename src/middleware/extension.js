import { DataHolder } from '../storage/holders.js';
import * as validate from './validate.js';


class Middleware {
    #req;
    #body;
    #payloadRoute;
    #payload;

    constructor(req) {
        this.#req = req;
        this.#body = req.body;
        this.#payloadRoute = '';
        this.#payload = {};
    }

    async validateMethod() {
        try {
            await validate.method(this.#req.method);
        } catch (error) {
            throw error;
        }
    }

    async validatePath() {
        try {
            this.#payloadRoute = await validate.path(this.#req.originalUrl);
        } catch (error) {
            throw error;
        }
    }

    async validateBody() {
        try {
            await new Promise((resolve, reject) => {
                const notEmpty = validate.data(this.#body);
                if (notEmpty == true) resolve();
                else reject(notEmpty);
            });

            this.#payload = this.#body;
        } catch (error) {
            throw error;
        }
    }

    async storePayload() {
        DataHolder.payload = this.#payload;
        DataHolder.path = this.#payloadRoute;
    }
}

export { Middleware };
