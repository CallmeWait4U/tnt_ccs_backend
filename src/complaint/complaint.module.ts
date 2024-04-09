import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

const application = [];

const infrastructure = [];

const domain = [];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [],
})
export class ComplaintModule {}
