import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseModule } from 'libs/database.module';
import { UtilityModule } from 'libs/utility.module';
import { AccountModule } from './account/account.module';
import { ActivityModule } from './activity/activity.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { CustomerModule } from './customer/customer.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    UtilityModule,
    DatabaseModule,
    PrismaClient,
    CompanyModule,
    AuthModule,
    CompanyModule,
    CustomerModule,
    AccountModule,
    ActivityModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
