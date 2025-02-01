import { ErrorNormalizer } from "./normalizer.js";


class DatabaseError extends ErrorNormalizer {
    constructor(message) {
        super(message);
    }
}

export { DatabaseError };
