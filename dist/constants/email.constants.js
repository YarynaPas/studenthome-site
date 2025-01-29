"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailConstants = void 0;
const email_type_1 = require("../enum/email-type");
exports.emailConstants = {
    [email_type_1.emailType.WELCOME]: {
        subject: "Ви успішно зареєстровані",
        template: "welcome", // без .hbs, оскільки ви додаєте .hbs під час виклику
    },
    [email_type_1.emailType.FORGOT_PASSWORD]: {
        subject: "Відновлення пароля",
        template: "forgot-password",
    },
    [email_type_1.emailType.OLD_VISIT]: {
        subject: "Old visit",
        template: "old-visit",
    },
    [email_type_1.emailType.RESET_PASSWORD]: {
        subject: "Reset password",
        template: "reset-password",
    },
    [email_type_1.emailType.APPLICATION_SUBMITTED]: {
        subject: "Заявка на виконання роботи надіслана",
        template: "application_submitted",
    },
    [email_type_1.emailType.APPLICATION_IS_WRITING]: {
        subject: "Ваша робота вже в процесі написання",
        template: "application_is_writing",
    },
    [email_type_1.emailType.APPLICATION_DONE]: {
        subject: "Ваша робота вже готова",
        template: "ready",
    },
};
