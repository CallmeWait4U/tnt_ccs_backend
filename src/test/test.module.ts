import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EmailModule } from 'libs/email.module';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [CqrsModule, EmailModule],
  providers: [TestService],
  controllers: [TestController],
})
export class TestModule {}
