import * as errs from '../errors/index.js';
import { DataHolder } from "../storage/holders.js";


const extendErrors = async (error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        error = new errs.JsonError(error);
    }

    if (errs.classes.allow.includes(error.name)) {
        const customError = errs.set(error, 'content');
        await errs.write(DataHolder.path, customError, 'log', 'content');
        res.status(200).send(`${DataHolder.path.toUpperCase()} received. ${errs.fields()}`);
    } else if (errs.classes.log.includes(error.name)) {
        await errs.log(error);
        res.status(error.code || 422).send(error.response);
    } else {
        const customError = errs.set(error, 'content');
        await errs.write(DataHolder.path, customError, 'log', 'content');
        await errs.email(customError);
        res.status(500).send(`Error. Please try again. ${errs.fields()}`);
    }

    next();
};

export { extendErrors };
