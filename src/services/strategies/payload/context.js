import * as alert from './alert.js';
import * as scan from './scan.js';


class PayloadContext {
    constructor(path) {
        switch (path) {
            case 'Scan':
                this.strategy = new scan.Strategy();
                break;
            case 'Alert':
                this.strategy = new alert.Strategy();
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
