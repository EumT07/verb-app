import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    welcomeTemplate,
    recoveryPassTemplate
} from "./template/emailTemplates"

@Injectable()
export class EmailService {
    constructor(
        private readonly configService: ConfigService,
        private readonly mailerService: MailerService
    ){}

    async sendEmail_welcome(data){
        try {

            const { username, firstName, lastName, email } = data;

            let subject = `Hello ${username}, Welcome To VerbsApp`;

            const html = welcomeTemplate(username,firstName,lastName);

            await this.mailerService.sendMail({
                from: "",
                to: email,
                subject,
                html,
            })
            
            return;
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }

    async sendEmail_recoveryPassword(data, token){
        try {
            const { userName, firstName, lastName, email } = data;
            
            let subject = `Hello ${userName} , Recovery Pasword`;

            const html = recoveryPassTemplate(userName, firstName,lastName, token);

            await this.mailerService.sendMail({
                from: "",
                to: email,
                subject,
                html,
            });

            return {
                status: 201,
                message: 'We have sent to you an email.!!',
            };
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }
}


