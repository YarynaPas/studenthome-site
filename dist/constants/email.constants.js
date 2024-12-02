"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailConstants = void 0;
const email_type_1 = require("../enum/email-type");
exports.emailConstants = {
    [email_type_1.emailType.WELCOME]: {
        subject: "Ви успішно зареєстровані",
        template: "welcome"
    },
    [email_type_1.emailType.FORGOT_PASSWORD]: {
        subject: "Відновлення пароля",
        template: "forgot-password"
    },
    [email_type_1.emailType.OLD_VISIT]: {
        subject: "old visit",
        template: "old-visit"
    },
    [email_type_1.emailType.RESET_PASSWORD]: {
        subject: "reset password",
        template: "reset-password"
    },
    [email_type_1.emailType.DOCUMENT_ATTACHMENT]: {
        subject: 'Document Attachment',
        template: 'template'
    },
    [email_type_1.emailType.MANAGER_NOTIFICATION]: {
        subject: 'Car Listing Requires Review',
        template: 'manager-notification',
    },
};
