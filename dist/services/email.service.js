"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const config_1 = __importDefault(require("../config/config"));
const email_constants_1 = require("../constants/email.constants");
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: { user: config_1.default.SMPT_EMAIL, pass: config_1.default.SMPT_PASSWORD },
        });
    }
    generateHtmlFromHbs(templateName, context) {
        try {
            const mainTemplatePath = path.resolve(__dirname, '../templates/main.hbs');
            if (!fs.existsSync(mainTemplatePath)) {
                throw new Error('Основний шаблон HBS не знайдено');
            }
            const mainTemplate = fs.readFileSync(mainTemplatePath, 'utf-8');
            const compiledMainTemplate = handlebars_1.default.compile(mainTemplate);
            const templatePath = path.resolve(__dirname, `../templates/views/${templateName}.hbs`);
            if (!fs.existsSync(templatePath)) {
                throw new Error(`Шаблон ${templateName} не знайдено`);
            }
            const hbsTemplate = fs.readFileSync(templatePath, 'utf-8');
            const compiledTemplate = handlebars_1.default.compile(hbsTemplate);
            const emailContent = compiledTemplate(context);
            return compiledMainTemplate(Object.assign(Object.assign({}, context), { body: emailContent }));
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(`Помилка генерації HTML з шаблону: ${error.message}`);
            }
            else {
                console.error('Невідома помилка при генерації HTML з шаблону');
            }
            throw new Error('Не вдалося згенерувати HTML з шаблону');
        }
    }
    sendMail(to_1, type_1) {
        return __awaiter(this, arguments, void 0, function* (to, type, context = {}) {
            const { subject, template } = email_constants_1.emailConstants[type];
            if (!subject || !template) {
                console.error('Не вдалося знайти тему чи шаблон для відправки листа');
                throw new Error('Недійсні параметри для відправки листа');
            }
            const htmlContent = this.generateHtmlFromHbs(template, context);
            const options = {
                from: `"Studenthome" <${config_1.default.SMPT_EMAIL}>`,
                to,
                subject,
                html: htmlContent,
            };
            try {
                yield this.transporter.sendMail(options);
                console.log(`Лист успішно надіслано на емейл: ${to}`);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(`Помилка надсилання листа: ${error.message}`);
                }
                else {
                    console.error('Невідома помилка при надсиланні листа');
                }
                throw new Error('Не вдалося надіслати лист');
            }
        });
    }
}
exports.emailService = new EmailService();
