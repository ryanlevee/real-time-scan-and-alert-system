import { Database } from "../models/database.js";
import { DataStore } from "../storage/stores.js";


class End {
    static async prog() {
        await End.close();
    }

    static async close() {
        await DataStore.endCount;
        await Database.closePool();
    };
}

export { End };
