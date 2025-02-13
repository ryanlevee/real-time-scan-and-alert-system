import { Utl } from "../common/utility.js";
import { Controller } from "../controllers/controller.js";
import { ErrorHolder } from "../storage/holders.js";


const logErrors = async error => {
    ErrorHolder[error.type] = error.message || error.response || String(error);
    const controller = new Controller();
    return await Utl.composeAsync(controller.database, controller.sql)();
};

export { logErrors };
