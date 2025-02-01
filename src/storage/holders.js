class DataHolder {
    constructor() {
        this._path = '';
        this._payload = {};
    }

    static init() {
        this.dataHolder = new DataHolder();
    }

    static get path() {
        return this.dataHolder._path;
    }

    static set path(data) {
        this.dataHolder._path = data;
    }

    static get payload() {
        return this.dataHolder._payload;
    }

    static set payload(data) {
        this.dataHolder._payload = data;
    }
}

class ErrorHolder {
    constructor(path) {
        this._middleware = {};
        this._payload = {};
        this._geocode = {};
        this._sql = {};
        this.reqPath = path;
        this.table = 'Webhook_Errors';
    }

    static reqIp;

    static init(ip, path) {
        this.reqIp = ip;
        this.errorHolder = new ErrorHolder(path);
    }

    static get middleware() {
        return { [this.errorHolder.table]: this.errorHolder._middleware };
    }

    static set middleware(err) {
        this.errorHolder._middleware = this.#set(err);
    };

    static get payload() {
        return { [this.errorHolder.table]: this.errorHolder._payload };
    }

    static set payload(errStr) {
        console.log(errStr);
        
        this.errorHolder._payload = this.#set(errStr);
    };

    static get geocode() {
        return { [this.errorHolder.table]: this.errorHolder._geocode };
    }

    static set geocode(errStr) {
        this.errorHolder._geocode = this.#set(errStr);
    };

    static #set(errObj) {
        const errStr = errObj.error;
        const columns = ['ip_address', 'path', 'error_content'];
        const error_content = `${errStr}`.replaceAll(/(\r\n|\n|\r)/gm, '').replaceAll("'", "''");
        const values = [this.reqIp, this.errorHolder.reqPath, error_content];
        console.error(`${this.reqIp}\n${this.errorHolder.reqPath}\n${error_content}`);
        return columns.reduce((obj, k, i) => (obj[k] = values[i], obj), {});
    }
}

export { DataHolder, ErrorHolder };
