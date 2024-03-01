import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [CqrsModule],
  providers: [TestService],
  controllers: [TestController],
})
export class TestModule {}
