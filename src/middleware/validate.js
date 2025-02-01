import * as errs from "../errors/classes/middleware.js";


const validateMethod = async method => {
    switch (method) {
        case 'POST':
            return true;
        default:
            throw new errs.HttpMethodError(method);
        // extensible
    }
};

const validatePath = async urlPath => {
    switch (urlPath) {
        case '/livescan':
            return 'LiveScan';
        case '/livealert':
            return 'LiveAlert';
        default:
            throw new errs.UrlPathError(urlPath);
        // extensible
    }
};

const validateBody = data => !!Object.values(data)?.length || new errs.EmptyError();

export {
    validateBody as data,
    validateMethod as method,
    validatePath as path
};

