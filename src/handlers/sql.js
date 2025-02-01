import { Utl } from "../common/utility.js";
import { DataHolder, ErrorHolder } from '../storage/holders.js';


const handleSql = sqlPayload => {
    try {
        const sqlPayloadObject = { [DataHolder.path]: sqlPayload }
        const sqlMiddlewareError = ErrorHolder.middleware;
        const sqlPayloadError = ErrorHolder.payload;
        const sqlGeocodeError = ErrorHolder.geocode;

        return [
            sqlPayloadObject, 
            sqlMiddlewareError,
            sqlPayloadError,
            sqlGeocodeError,
        ].filter(Utl.truthy);
    } catch (error) {
        throw error
    }
};

export { handleSql };
