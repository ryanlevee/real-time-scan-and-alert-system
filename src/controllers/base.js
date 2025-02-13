import { Utl } from '../common/utility.js';
import { Controller } from './controller.js';


class BaseController extends Controller {
    constructor(req) {
        super();
        this.req = req;
    }

    async process() {
        try {
            const composeControllers = Utl.composeAsync(
                this.database.bind(this),
                this.sql.bind(this),
                this.geocode.bind(this),
                this.payload.bind(this),
            );
            await composeControllers(this.req);
        } catch (error) {
            throw error;
        }
    }
}

export { BaseController };
