import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Injectable, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AutoMailDTO, MailerDTO } from 'interfaces/mailer.dto';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { join } from 'path';

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  mailTransport() {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
    return transporter;
  }

  template(html: string, replacements: Record<string, string>) {
    return html.replace(/%(\w*)%/g, (m, key) => {
      return replacements.hasOwnProperty(key) ? replacements[key] : '';
    });
  }

  async sendEmail(mailer: MailerDTO) {
    const { from, recipients, subject } = mailer;
    const html = mailer.placeholderReplacements
      ? this.template(mailer.html, mailer.placeholderReplacements)
      : mailer.html;
    const transport = this.mailTransport();
    const options: Mail.Options = {
      from: from ?? {
        name: this.configService.get<string>('APP_NAME'),
        address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
      },
      to: recipients,
      subject,
      html,
      attachments: mailer.attachments
        ? mailer.attachments.map((attachment) => ({
            filename: attachment.originalname,
            content: attachment.buffer,
            contentType: attachment.mimetype,
            contentTransferEncoding: 'base64',
          }))
        : [],
    };
    const result = await transport.sendMail(options);
    return result;
  }

  async sendAutoEmail(mail: AutoMailDTO) {
    const result = await this.mailerService.sendMail({
      from: mail.from,
      to: mail.recipients,
      subject: mail.subject,
      template: mail.isCustomer
        ? join(__dirname, '../mail/templates/autoNotifyTaskForCus')
        : join(__dirname, '../mail/templates/autoNotifyTaskForEmp'),
      context: {
        tasks: mail.tasks,
        tenantName: mail.tenantName,
        employeeName: mail.employeeName,
      },
    });
    return result;
  }
}

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get<string>('MAIL_USER'),
            pass: config.get<string>('MAIL_PASSWORD'),
          },
        },
        template: {
          dir: join(__dirname, '../mail/templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
