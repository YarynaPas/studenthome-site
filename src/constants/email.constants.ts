import { emailType } from "../enum/email-type";

export const emailConstants = {
    [emailType.WELCOME]: {
        subject: "Ви успішно зареєстровані",
        template: "welcome"
    },
    [emailType.FORGOT_PASSWORD]: {
        subject: "Відновлення пароля",
        template: "forgot-password"
    },
    [emailType.OLD_VISIT]: {
        subject: "old visit",
        template: "old-visit"
    },
    [emailType.RESET_PASSWORD]: {
        subject: "reset password",
        template: "reset-password"
    },
    [emailType.DOCUMENT_ATTACHMENT]: {
        subject: 'Document Attachment',
        template: 'template'
    },
    [emailType.MANAGER_NOTIFICATION]: {
        subject: 'Car Listing Requires Review',
        template: 'manager-notification',
    },
};
