import { payloadFields } from '../../../common/payloadFields.js';
import { PayloadStrategy } from './payload.js';


class LiveScanStrategy extends PayloadStrategy {
    getFieldList() {
        return payloadFields.LiveScan.split(', ');
    }
}

export { LiveScanStrategy as Strategy };
