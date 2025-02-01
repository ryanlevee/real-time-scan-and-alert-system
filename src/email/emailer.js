import { MailService } from '@sendgrid/mail';
import dotenv from 'dotenv';
import { Utl } from '../common/utility.js';
dotenv.config({ path: import.meta.dirname + '/config/.env' });


class Emailer {
    #mailService;

    constructor() {
        this.#mailService = new MailService();
        // this.#mailService.setApiKey(process.env.SENDGRID_API_KEY);
    }

    async emailError(errorObj) {
        const msg = {
            to: [
                process.env.TO_EMAIL1,
            ],

            from: process.env.FROM_EMAIL,
            subject: `LPR Webhook Error`,
            text: errorObj.content
        };

        try {
            Utl.cLog(msg, '::::email message::::')
            // const response = await this.#mailService.sendMultiple(msg);
            // return response[0];
        } catch (error) {
            throw error;
        }
    }
}

export { Emailer };
