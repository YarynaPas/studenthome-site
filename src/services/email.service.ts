import nodemailer, { Transporter } from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import Handlebars from 'handlebars';
import configs from '../config/config';
import { emailType } from "../enum/email-type";
import { emailConstants } from "../constants/email.constants";

class EmailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: configs.SMPT_EMAIL, pass: configs.SMPT_PASSWORD },
        });
    }

    private generateHtmlFromHbs(templateName: string, context: any): string {
        try {
            const mainTemplatePath = path.resolve(__dirname, '../templates/main.hbs');
            if (!fs.existsSync(mainTemplatePath)) {
                throw new Error('Основний шаблон HBS не знайдено');
            }

            const mainTemplate = fs.readFileSync(mainTemplatePath, 'utf-8');
            const compiledMainTemplate = Handlebars.compile(mainTemplate);

            const templatePath = path.resolve(__dirname, `../templates/views/${templateName}.hbs`);
            if (!fs.existsSync(templatePath)) {
                throw new Error(`Шаблон ${templateName} не знайдено`);
            }

            const hbsTemplate = fs.readFileSync(templatePath, 'utf-8');
            const compiledTemplate = Handlebars.compile(hbsTemplate);

            const emailContent = compiledTemplate(context);
            return compiledMainTemplate({ ...context, body: emailContent });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Помилка генерації HTML з шаблону: ${error.message}`);
            } else {
                console.error('Невідома помилка при генерації HTML з шаблону');
            }
            throw new Error('Не вдалося згенерувати HTML з шаблону');
        }
    }

    public async sendMail(to: string, type: emailType, context: any = {}): Promise<void> {
        const { subject, template } = emailConstants[type];
        if (!subject || !template) {
            console.error('Не вдалося знайти тему чи шаблон для відправки листа');
            throw new Error('Недійсні параметри для відправки листа');
        }

        const htmlContent = this.generateHtmlFromHbs(template, context);

        const options = {
            from: `"Studenthome" <${configs.SMPT_EMAIL}>`,
            to,
            subject,
            html: htmlContent,
        };

        try {
            await this.transporter.sendMail(options);
            console.log(`Лист успішно надіслано на емейл: ${to}`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Помилка надсилання листа: ${error.message}`);
            } else {
                console.error('Невідома помилка при надсиланні листа');
            }
            throw new Error('Не вдалося надіслати лист');
        }
    }
}

export const emailService = new EmailService();
