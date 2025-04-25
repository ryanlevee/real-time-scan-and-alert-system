import { payloadFields } from '../../../common/payloadFields.js';
import { PayloadStrategy } from './payload.js';


class ScanStrategy extends PayloadStrategy {
    getFieldList() {
        return payloadFields.Scan.split(', ');
    }
}

export { ScanStrategy as Strategy };
