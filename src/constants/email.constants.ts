import { emailType } from "../enum/email-type";

export const emailConstants = {
    [emailType.WELCOME]: {
        subject: "Ви успішно зареєстровані",
        template: "welcome",  // без .hbs, оскільки ви додаєте .hbs під час виклику
    },
    [emailType.FORGOT_PASSWORD]: {
        subject: "Відновлення пароля",
        template: "forgot-password",
    },
    [emailType.OLD_VISIT]: {
        subject: "Old visit",
        template: "old-visit",
    },
    [emailType.RESET_PASSWORD]: {
        subject: "Reset password",
        template: "reset-password",
    },
    [emailType.APPLICATION_SUBMITTED]: {
        subject: "Заявка на виконання роботи надіслана",
        template: "application_submitted",
    },
    [emailType.APPLICATION_IS_WRITING]: {
        subject: "Ваша робота вже в процесі написання",
        template: "application_is_writing",
    },
    [emailType.APPLICATION_DONE]: {
        subject: "Ваша робота вже готова",
        template: "ready",
    },
};
