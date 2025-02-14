import { payloadFields } from '../../../common/payloadFields.js';
import * as errs from '../../../errors/classes/payload.js';
import { PayloadStrategy } from './payload.js';


class LiveAlertStrategy extends PayloadStrategy {
    getFieldList(payloadObj) {
        const { type } = payloadObj;

        if (!payloadFields.LiveAlert[type]) {
            throw new errs.UnhandledLiveAlertTypeError(type, payloadObj);
        }

        return payloadFields.LiveAlert[type].split(', ');
    }
}

export { LiveAlertStrategy as Strategy };
