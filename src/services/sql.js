import { Utl } from '../common/utility.js';


class SqlService {
    process(arr) {
        if (!Utl.truthy(arr)) return false;
        return arr.map(this.#setSqlObject);
    }

    #setSqlObject = item => {
        const type = this.#getType(item);
        const data = this.#getData(item);
        return { [type]: this.#sqlizeData(data) };
    };

    #getType = item => Object.keys(item)[0]

    #getData = item => Object.values(item)[0]

    #sqlizeData(data) {
        const values = Object.values(data);
        const keys = Object.keys(data);
        Utl.sqlizeDates(values, keys);
        values.forEach((v, i) => values[i] = v && String(v).replaceAll("'", "''"));
        Utl.sqlizeNulls(values);
        return keys.reduce((obj, k, i) => (obj[k] = values[i], obj), {});
    }
}

export { SqlService };
