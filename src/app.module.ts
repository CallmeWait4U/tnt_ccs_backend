import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseModule } from 'libs/database.module';
import { FirebaseModule } from 'libs/firebase.module';
import { RmqModule } from 'libs/rabbitmq.module';
import { RedisModule } from 'libs/redis.module';
import { UtilityModule } from 'libs/utility.module';
import { AccountModule } from './account/account.module';
import { ActivityModule } from './activity/activity.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BillModule } from './bill/bill.module';
import { CompanyModule } from './company/company.module';
import { CustomerModule } from './customer/customer.module';
import { NotificationModule } from './notification/notification.module';
import { PhaseModule } from './phase/phase.module';
import { PriceQuoteModule } from './priceQuote/priceQuote.module';
import { PriceQuoteRequestModule } from './priceQuoteRequest/priceQuoteRequest.module';
import { ProductModule } from './product/product.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    UtilityModule,
    DatabaseModule,
    FirebaseModule,
    RmqModule,
    RedisModule,
    PrismaClient,
    CompanyModule,
    AuthModule,
    CompanyModule,
    CustomerModule,
    AccountModule,
    ActivityModule,
    PhaseModule,
    ProductModule,
    PriceQuoteModule,
    PriceQuoteRequestModule,
    BillModule,
    NotificationModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
