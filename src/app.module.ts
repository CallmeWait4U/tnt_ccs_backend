import { Module } from '@nestjs/common';
import { CatsController } from './app.controller';
import { CatsService } from './app.service';
import { CompanyController } from './company/presentation/company.controller';

@Module({
  imports: [],
  controllers: [CatsController, CompanyController],
  providers: [CatsService],
})
export class AppModule {}
