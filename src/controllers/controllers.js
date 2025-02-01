import { Utl } from '../common/utility.js';
import * as handle from '../handlers/index.js';
import * as models from '../models/index.js';
import * as services from '../services/index.js';


class Controller {
    async payload() {
        try {
            const service = new services.Payload();
            return await service.process();
        } catch (error) {
            error.type = this.name
            throw error;
        }
    };

    async geocode(data) {
        try {
            if (!Utl.truthy(data)) return false;
            const service = new services.Geocode(data);
            return await service.process();
        } catch (error) {
            throw error;
        }
    };

    sql(sqlPayload) {
        try {
            const arr = handle.sql(sqlPayload);
            const service = new services.Sql();
            return service.process(arr)
        } catch (error) {
            throw error;
        }
    };

    async database(arr) {
        try {
            return await models.Database.runProcedureArr(arr);
        } catch (error) {
            error.data = arr;
            throw error;
        }
    };
}

export { Controller };
