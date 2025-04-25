import { ControllerError } from "./controllers.js";


class UnhandledAlertTypeError extends ControllerError {
    constructor(arg, obj) {
        super();
        this.arg = arg;
        this.obj = obj;
    }

    get message() {
        return { error: `Unrecognized Loss Alert type: ${this.arg}. Data: ${JSON.stringify(this.obj)}` };
    }

    _response = "Data Error: Unrecognized Loss Alert type '{%type%}'. Please verify your JSON and try again.";

    get response() {
        return { error: this._response.replace('{%type%}', this.arg) };
    }
}

export {
    UnhandledAlertTypeError
};
