import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('image')
@Controller('image')
export class ImageController {
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadedFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      originalname: file?.originalname,
      filename: file?.filename,
    };

    const uploadPath = path.join(__dirname, '../../../upload');
    const destinationPath = path.join(uploadPath.toString(), file?.filename);

    // Di chuyển file vào thư mục upload
    fs.renameSync(file?.path, destinationPath);
    console.log(file);
    return response;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
}
