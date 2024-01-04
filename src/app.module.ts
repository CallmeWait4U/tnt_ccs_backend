import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseModule } from 'libs/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [DatabaseModule, PrismaClient, CompanyModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
