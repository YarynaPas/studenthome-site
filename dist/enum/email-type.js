"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailType = void 0;
var emailType;
(function (emailType) {
    emailType["WELCOME"] = "welcome";
    emailType["FORGOT_PASSWORD"] = "forgot-password";
    emailType["OLD_VISIT"] = "old-visit";
    emailType["RESET_PASSWORD"] = "reset-password";
    emailType["DOCUMENT_ATTACHMENT"] = "document-attachment";
    emailType["MANAGER_NOTIFICATION"] = "unactivated.hbs";
})(emailType || (exports.emailType = emailType = {}));
