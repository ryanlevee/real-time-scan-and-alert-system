import * as errs from './index.js';


const allow = [
    errs.database.DatabaseError.name,
];

const log = [
    errs.middleware.HttpMethodError.name,
    errs.middleware.UrlPathError.name,
    errs.middleware.EmptyError.name,
    errs.middleware.JsonError.name,
    errs.payload.UnhandledLiveAlertTypeError.name,
];

export { allow, log };
