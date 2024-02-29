import { Module } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { ImageController } from './presentation/image.controller';
import { ImageService } from './presentation/image.service';

@Module({
  imports: [CqrsModule, FirebaseModule],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
