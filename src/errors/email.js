import { Emailer } from "../email/emailer.js";


const emailError = async errorObj => {
    const emailer = new Emailer();
    return await emailer.emailError(errorObj);
};

export { emailError };
