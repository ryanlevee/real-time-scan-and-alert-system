import express from 'express';
import * as alert from '../controllers/alert.js';
import * as errs from '../errors/index.js';
import { DataHolder } from '../storage/holders.js';


const alertRouter = express.Router();

alertRouter.post('/', async (req, res, next) => {
    const controller = new alert.Controller();

    try {
        await controller.process();

        return res.status(200).json({
            message: `${DataHolder.path.toUpperCase()} received successfully.`,
            error: errs.fields() || 'None'
        });
    } catch (error) {
        next(error);
    } finally {
        next();
    }
});

export { alertRouter };
