import { Utl } from "../../../common/utility.js";
import { fieldsResponseInit } from "../../../errors/responses.js";
import { ErrorHolder } from "../../../storage/holders.js";


class PayloadStrategy {
    getFieldList(payloadObj) {
        throw new Error('Method not implemented');
    }

    navigateFields(fieldList, reqObj) {
        try {
            const returnKeys = fieldList;
            const payloadKeys = Utl.getFlatKeyList(reqObj);
            const badKeys = Utl.compareLists(returnKeys, payloadKeys);
            this.#validateFields(badKeys, reqObj);
        } catch (error) {
            throw error;
        }
    }

    #validateFields(badKeys, reqObj) {
        if (Object.values(badKeys).flat().length) {
            const idString = `for record_id ${reqObj.record_id}`;
            let errorString = '';

            if (badKeys.newFields.length) {
                errorString = this.#setNewFieldStr(errorString, idString, badKeys, reqObj);
            }

            if (badKeys.missingFields.length) {
                errorString = this.#setMissingFieldsStr(errorString, idString, badKeys);
            }

            ErrorHolder.payload = { error: errorString };
            fieldsResponseInit(badKeys.missingFields, badKeys.newFields);
        }
    }

    #setMissingFieldsStr(errorString, idString, badKeys) {
        errorString += `Missing Field Error ${idString}: `
            + badKeys.missingFields.join(', ');
        return errorString;
    }

    #setNewFieldStr(errorString, idString, badKeys, reqObj) {
        errorString += `New Field Error ${idString}: `
            + `(${badKeys.newFields.map(k => `${k}: `
                + `${JSON.stringify(reqObj[k])}`).join(', ')}); `;
        return errorString;
    }

    addDataToObj = returnObj => ({
        ...returnObj,
        ip_address: ErrorHolder.reqIp
    });
}

export { PayloadStrategy };
