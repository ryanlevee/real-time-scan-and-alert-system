import express from 'express';
import * as scan from '../controllers/scan.js';
import * as errs from '../errors/index.js';
import { DataHolder } from '../storage/holders.js';


const scanRouter = express.Router();

scanRouter.post('/', async (req, res, next) => {
    const controller = new scan.Controller();

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

export { scanRouter };
