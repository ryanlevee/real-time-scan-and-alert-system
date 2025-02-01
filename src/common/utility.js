export class Utl {
    static cLog(v, s = '') {
        console.log(s);
        console.log(v);
    }

    static arrayIfNot(arr) {
        return Array.isArray(arr) ? arr : [arr];
    }

    static truthy(item) {
        if (!item) return false;
        else if (Array.isArray(item)) return item.some(v => Utl.truthy(v));
        else if (typeof item == 'object') return Object.values(item).some(v => Utl.truthy(v));
        return true;
    }

    static async waitSec(sec) {
        return new Promise(resolve =>
            setTimeout(() => resolve(true), sec * 1000)
        );
    }

    static composeAsync = (...fns) => x => fns.reduceRight(async (acc, fn) => fn(await acc), x);

    static localizeDatetime(dt) {
        const loc = 'en-US';
        const options = { timeZone: 'America/Los_Angeles', hourCycle: 'h24' };
        return (dt || new Date()).toLocaleString(loc, options).replace(',', '');
    }

    static sqlizeDates(values) {
        const re = new RegExp('^(\\d{4})-(\\d{2})-(\\d{2})(T|\\W)?(\\d{2}):(\\d{2})'
            + ':(\\d{2}(?:\\.\\d*)?)((-(\\d{2}):(\\d{2})|Z)?)$');

        values.forEach((v, i) => {
            if (v && re.test(v)) {
                if (typeof v == 'string') v = new Date(v);
                else if (typeof v == 'object') v = v.toISOString();
                values[i] = Utl.localizeDatetime(v);
            }
        });
    }

    static compareLists(newArr, prevArr) {
        const prevSet = new Set(prevArr.map(v => v.toLowerCase()));
        const newSet = new Set(newArr.map(v => v.toLowerCase()));
        const missingFields = newArr.filter(k => !prevSet.has(k.toLowerCase()));
        const newFields = prevArr.filter(k => !newSet.has(k.toLowerCase()));
        return { missingFields, newFields };
    }

    static destructureList(lst, neg, char) {
        const firstKeys = lst.slice(0, neg);
        const lastKeys = lst.slice(neg);
        return [...firstKeys, ...lastKeys.map(k => k.split(char)).flat()];
        // return lst.map(k => k.split(char)).flat();
    }

    static getFlatKeyList(obj) {
        let keyList = [];
        Object.entries(obj).forEach(e => {
            keyList.push(e[0]);
            if (e[1] && typeof e[1] == 'object') {
                keyList.push(Object.keys(e[1]));
            }
            keyList = keyList.flat();
        });
        return keyList;
    }

    static mergeNestedObjectKeys(object, prevKey) {
        return Object.entries(object).reduce((acc, [key, value]) => {
            const newKey = prevKey ? `${prevKey}_${key}` : key;

            if (value instanceof Object && !Array.isArray(value)) {
                Object.assign(acc, Utl.mergeNestedObjectKeys(value, newKey));
            } else {
                acc[newKey] = value;
            }

            return acc;
        }, {});
    };

    static sqlizeNulls(arr) {
        arr.forEach((a, i) =>
            a && (
                arr[i] = a
                    .replace("''NULL''", null)
                    .replace("'NULL'", null)
                    .replace("'null'", null)
                    .replace("null", null)
            )
        );
    }

    static getUniqueKeys(parsedBody) {
        const keySet = Array.from(new Set(
            parsedBody.map(obj =>
                JSON.stringify(Object.keys(obj).map(k => k.toLowerCase()))
            )
        ), JSON.parse);

        let allKeys = [];
        keySet.forEach(returnKeys => allKeys = [...allKeys, ...returnKeys]);

        const returnKeys = [...new Set(allKeys)];
        returnKeys.sort();

        return returnKeys;
    }

    static sortObjectByArray(obj, arr) {
        const objLower = Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v])
        );

        return arr.reduce((retArr, key) => {
            key = key.toLowerCase();
            if (objLower.hasOwnProperty(key)) {
                retArr[key] = objLower[key];
            } else {
                retArr[key] = null;
            }
            return retArr;
        }, {});
    }
}
