import { ControllerError } from "./controllers.js";


class HttpMethodError extends ControllerError {
    constructor(arg) {
        super();
        this.arg = arg;
    }

    _response = 'HTTP Method Error: Invalid method {%method%}. POST required.';
    _code = 400;

    get response() {
        return { error: this._response.replace('{%method%}', this.arg) };
    }

    get code() {
        return this._code;
    }
}

class UrlPathError extends ControllerError {
    constructor(arg) {
        super();
        this.arg = arg;
    }

    _response = 'URL Path Error: Invalid path {%path%}.';
    _code = 400;

    get response() {
        return { error: this._response.replace('{%path%}', this.arg) };
    }

    get code() {
        return this._code;
    }
}

class EmptyError extends ControllerError {
    constructor() {
        super();
    }

    _response = 'JSON Error: No data in body of request.';
    _code = 422;

    get response() {
        return { error: this._response };
    }

    get code() {
        return this._code;
    }
}

class JsonError extends ControllerError {
    constructor() {
        super();
    }

    _response = 'JSON Error: Malformed JSON. Please try again.';
    _code = 422;
    _type = 'middleware';

    get response() {
        return { error: this._response };
    }

    get type() {
        return this._type;
    }
}

export {
    EmptyError,
    HttpMethodError,
    JsonError,
    UrlPathError
};
