import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePriceQuoteHandler } from './application/command-handler/create.priceQuote.handler';
import { DeletePriceQuoteHandler } from './application/command-handler/delete.priceQuote.handler';
import { UpdatePriceQuoteHandler } from './application/command-handler/update.priceQuote.handler';
import { GetPriceQuotesHandler } from './application/query-handler/list.priceQuote.handler';
import { ReadPriceQuoteHandler } from './application/query-handler/read.priceQuote.handler';
import { StatisticPriceQuoteHandler } from './application/query-handler/statistic.priceQuote.handler';
import { PriceQuoteDomain } from './domain/priceQuote.domain';
import { PriceQuoteFactory } from './infrastructure/priceQuote.factory';
import { PriceQuoteQuery } from './infrastructure/priceQuote.query';
import { PriceQuoteRepository } from './infrastructure/priceQuote.repository';
import { PriceQuoteController } from './presentation/priceQuote.controller';

const application = [
  GetPriceQuotesHandler,
  ReadPriceQuoteHandler,
  CreatePriceQuoteHandler,
  UpdatePriceQuoteHandler,
  DeletePriceQuoteHandler,
  StatisticPriceQuoteHandler,
];

const infrastructure = [
  PriceQuoteRepository,
  PriceQuoteQuery,
  PriceQuoteFactory,
];

const domain = [PriceQuoteDomain];

@Module({
  imports: [CqrsModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [PriceQuoteController],
})
export class PriceQuoteModule {}
