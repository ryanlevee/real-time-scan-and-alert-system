import * as liveAlert from './liveAlert.js';
import * as liveScan from './liveScan.js';


class PayloadContext {
    constructor(path) {
        switch (path) {
            case 'LiveScan':
                this.strategy = new liveScan.Strategy();
                break;
            case 'LiveAlert':
                this.strategy = new liveAlert.Strategy();
                break;
            default:
                throw new Error('Unknown path');
        }
    }

    getFieldList(payloadObj) {
        return this.strategy.getFieldList(payloadObj);
    }

    navigateFields(fieldList, flattenedObj) {
        return this.strategy.navigateFields(fieldList, flattenedObj);
    }

    addDataToObj(returnObj) {
        return this.strategy.addDataToObj(returnObj);
    };
}

export { PayloadContext as Payload };
