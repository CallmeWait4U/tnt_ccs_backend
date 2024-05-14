import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { MailerDTO } from 'interfaces/mailer.dto';
import { EmailService } from 'libs/email.module';
import { SendEmailDTO } from './test.dto';
import { TestService } from './test.service';

@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(
    private testService: TestService,
    private readonly emailService: EmailService,
  ) {}

  @Get('mockData')
  mockData() {
    return this.testService.mockData();
  }

  @Post('/sendEmail')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  sendEmail(
    @Body() body: SendEmailDTO,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const dto: MailerDTO = {
      from: { name: 'Thanh', address: 'tnt.ccs.system@gmail.com' },
      recipients: [{ name: 'Thanh2', address: 'thanh.bui2002bt@hcmut.edu.vn' }],
      subject: 'Nothing',
      html: '<p>Hi %name1%,</p><p>I am really sorry for disturbing you.</p><p>Best regards,</p><p>%name2%</p>',
      placeholderReplacements: { name1: 'HIHI', name2: 'THANH' },
      attachments: files,
    };
    return this.emailService.sendEmail(dto);
  }
}
