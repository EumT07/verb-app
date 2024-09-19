import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('nodemailer_host'),
          secure: false,
          auth: {
            user: configService.get('nodemailer_user'),
            pass: configService.get('nodemailer_password')
          },
        },
        defaults: {
          from: `No Replay: <${configService.get('nodemailer_email_from')}>`,
        }
      }),
      inject: [ConfigService],
    }),
    // ConfigModule,
  ],
  providers: [EmailService, ConfigService, PrismaService],
  exports: [EmailService]
})
export class EmailModule {}
