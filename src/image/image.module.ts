import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { ImageController } from './presentation/image.controller';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
  ],
  controllers: [ImageController],
})
export class ImageModule {}
