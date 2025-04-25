import { payloadFields } from '../../../common/payloadFields.js';
import * as errs from '../../../errors/classes/payload.js';
import { PayloadStrategy } from './payload.js';


class AlertStrategy extends PayloadStrategy {
    getFieldList(payloadObj) {
        const { type } = payloadObj;

        if (!payloadFields.Alert[type]) {
            throw new errs.UnhandledAlertTypeError(type, payloadObj);
        }

        return payloadFields.Alert[type].split(', ');
    }
}

export { AlertStrategy as Strategy };
