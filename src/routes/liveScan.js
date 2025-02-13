import express from 'express';
import * as liveScan from '../controllers/liveScan.js';
import * as errs from '../errors/index.js';
import { DataHolder } from '../storage/holders.js';


const liveScanRouter = express.Router();

liveScanRouter.post('/', async (req, res, next) => {
    const controller = new liveScan.Controller();

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

export { liveScanRouter };
