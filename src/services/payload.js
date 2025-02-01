import { payloadFields } from '../common/payloadFields.js';
import { Utl } from '../common/utility.js';
import * as errs from '../errors/classes/payload.js';
import { fieldsResponseInit } from '../errors/responses.js';
import { DataHolder, ErrorHolder } from '../storage/holders.js';


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
        const fieldList = this.#_navigateFieldList(payloadObj);
        const flattenedObj = Utl.mergeNestedObjectKeys(payloadObj);
        await this.#validateFields(fieldList, flattenedObj);
        return this.#addDataToObj(flattenedObj);
    }

    #_navigateFieldList(payloadObj) {
        let fieldList;

        switch (this.#path) {
            case 'LiveScan':
                fieldList = payloadFields.LiveScan.split(', ');
                break;

            case 'LiveAlert':
                const { type } = payloadObj;

                if (!payloadFields[this.#path][type])
                    throw new errs.UnhandledLiveAlertTypeError(type, payloadObj);

                fieldList = payloadFields[this.#path][type].split(', ');
                break;
            // extensible
        }
        return fieldList;
    }

    async #validateFields(fieldList, reqObj) {
        try {
            const returnKeys = fieldList;
            const payloadKeys = Utl.getFlatKeyList(reqObj);
            const badKeys = Utl.compareLists(returnKeys, payloadKeys);

            if (Object.values(badKeys).flat().length) {
                const idString = `for record_id ${reqObj.record_id}`;
                let errorString = '';

                if (badKeys.newFields.length) {
                    errorString += `New Field Error ${idString}: `
                        + `(${badKeys.newFields.map(k => `${k}: `
                            + `${JSON.stringify(reqObj[k])}`).join(', ')}); `;
                }

                if (badKeys.missingFields.length) {
                    errorString += `Missing Field Error ${idString}: `
                        + badKeys.missingFields.join(', ');
                }

                ErrorHolder.payload = { error: errorString };
                fieldsResponseInit(badKeys.missingFields, badKeys.newFields);
            }
        } catch (error) {
            throw error;
        }
    }

    #addDataToObj = returnObj => ({
        ...returnObj,
        ip_address: ErrorHolder.reqIp
    });


}

export { PayloadService };
