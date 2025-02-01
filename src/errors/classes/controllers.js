import { ErrorNormalizer } from "./normalizer.js";


class ControllerError extends ErrorNormalizer {
    constructor() {
        super();
    }

    _type;

    get type() {
        return this._type;
    }

    set type(thisName) {
        this._type = thisName
    }
}

export {
    ControllerError
};
