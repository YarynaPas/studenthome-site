import nodemailer, {Transporter} from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import Handlebars from 'handlebars';
import configs from '../config/config';
import {emailType} from "../enum/email-type";
import {emailConstants} from "../constants/email.constants";

class EmailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {user: configs.SMPT_EMAIL, pass: configs.SMPT_PASSWORD},
        });
    }

    private generateHtmlFromHbs(templateName: string, context: any): string {
        const mainTemplatePath = path.join(process.cwd(), 'src', 'templates', 'main.hbs');
        if (!fs.existsSync(mainTemplatePath)) {
            console.error('Основний шаблон HBS не знайдено за шляхом:', mainTemplatePath);
            throw new Error('Основний шаблон HBS не знайдено');
        }
        const mainTemplate = fs.readFileSync(mainTemplatePath, 'utf-8');
        const compiledMainTemplate = Handlebars.compile(mainTemplate);
        const templatePath = path.join(process.cwd(), 'src', 'templates', 'views', `${templateName}.hbs`);
        if (!fs.existsSync(templatePath)) {
            console.error('Шаблон HBS не знайдено за шляхом:', templatePath);
            throw new Error('Шаблон HBS не знайдено');
        }
        const hbsTemplate = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = Handlebars.compile(hbsTemplate);

        const emailContent = compiledTemplate(context);
        return compiledMainTemplate({...context, body: emailContent});
    }
    public async sendMail(to: string, type: emailType, context: any = {}): Promise<void> {
        const {subject, template} = emailConstants[type];
        const htmlContent = this.generateHtmlFromHbs(template, context);

        const options = {
            from: `"March-2024" <${configs.SMPT_EMAIL}>`,
            to,
            subject,
            html: htmlContent,
        };
        try {
            await this.transporter.sendMail(options);
            console.log(`Лист успішно надіслано на емейл: ${to}`);
        } catch (error) {
            console.error(`Помилка надсилання листа: ${error}`);
            throw new Error('Не вдалося надіслати лист');
        }
    }
}

export const emailService = new EmailService();
