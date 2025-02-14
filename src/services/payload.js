import { Utl } from '../common/utility.js';
import { DataHolder } from '../storage/holders.js';
import * as strategies from './strategies/payload/index.js';


class PayloadService {
    #payload;
    #path;

    constructor() {
        this.#payload = DataHolder.payload;
        this.#path = DataHolder.path;
    }

    async process() {
        if (!Utl.truthy(this.#payload)) return false;
        const payloadObj = this.#payload;
        const context = new strategies.context.Payload(this.#path);
        const fieldList = context.getFieldList(payloadObj);
        const flattenedObj = Utl.mergeNestedObjectKeys(payloadObj);
        context.navigateFields(fieldList, flattenedObj);
        return context.addDataToObj(flattenedObj);
    }
}

export { PayloadService };
