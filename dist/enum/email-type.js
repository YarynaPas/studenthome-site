"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailType = void 0;
var emailType;
(function (emailType) {
    emailType["WELCOME"] = "welcome.hbs";
    emailType["FORGOT_PASSWORD"] = "forgot-password.hbs";
    emailType["OLD_VISIT"] = "old-visit.hbs";
    emailType["RESET_PASSWORD"] = "reset-password.hbs";
    emailType["APPLICATION_IS_WRITING"] = "application_is_writing.hbs";
    emailType["APPLICATION_SUBMITTED"] = "application_submitted.hbs";
    emailType["APPLICATION_DONE"] = "ready.hbs";
})(emailType || (exports.emailType = emailType = {}));
