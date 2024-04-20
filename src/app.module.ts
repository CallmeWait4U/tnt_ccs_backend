import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { DatabaseModule } from 'libs/database.module';
import { EmailModule } from 'libs/email.module';
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
import { ComplaintModule } from './complaint/complaint.module';
import { CustomerModule } from './customer/customer.module';
import { NotificationModule } from './notification/notification.module';
import { PhaseModule } from './phase/phase.module';
import { PriceQuoteModule } from './priceQuote/priceQuote.module';
import { PriceQuoteRequestModule } from './priceQuoteRequest/priceQuoteRequest.module';
import { ProductModule } from './product/product.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UtilityModule,
    DatabaseModule,
    FirebaseModule,
    RmqModule,
    RedisModule,
    PrismaClient,
    EmailModule,
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
    ComplaintModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
