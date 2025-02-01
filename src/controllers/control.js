import { Utl } from '../common/utility.js';
import { Controller } from './index.js';


class Control {
    static #controller = new Controller();
    #req;
    #control;

    constructor(req) {
        this.#req = req;
        this.#control = Control.#controller;
    }

    async control() {
        try {
            const composeControllers = Utl.composeAsync(
                this.#control.database.bind(this.#control.database),
                this.#control.sql.bind(this.#control.sql),
                this.#control.geocode.bind(this.#control.geocode),
                this.#control.payload.bind(this.#control.payload),
            );

            await composeControllers(this.#req);
        } catch (error) {
            throw error;
        }
    }
}

export { Control };
