import express from 'express';
import { Control } from '../controllers/control.js';
import * as errs from '../errors/index.js';
import { DataHolder } from '../storage/holders.js';


const liveScanRouter = express.Router();

liveScanRouter.post('/', async (req, res, next) => {
    const router = new Control(req, res);

    try {
        await router.control();

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
