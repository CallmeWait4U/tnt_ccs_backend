import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
@ApiTags('files')
@Controller('files')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    console.log(file);
    return this.imageService.uploadImage(file);
  }
}
