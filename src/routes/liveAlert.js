import express from 'express';
import * as liveAlert from '../controllers/liveAlert.js';
import * as errs from '../errors/index.js';
import { DataHolder } from '../storage/holders.js';


const liveAlertRouter = express.Router();

liveAlertRouter.post('/', async (req, res, next) => {
    const controller = new liveAlert.Controller();

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

export { liveAlertRouter };
