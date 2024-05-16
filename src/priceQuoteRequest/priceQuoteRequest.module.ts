import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RmqModule } from 'libs/rabbitmq.module';
import { CreatePriceQuoteRequestHandler } from './application/command-handler/create.priceQuoteRequest.handler';
import { DeletePriceQuoteRequestHandler } from './application/command-handler/delete.priceQuoteRequest.handler';
import { SendPriceQuoteRequestHandler } from './application/command-handler/send.priceQuoteRequest.handler';
import { UpdatePriceQuoteRequestHandler } from './application/command-handler/update.priceQuoteRequest.handler';
import { GetPriceQuoteRequestByCustomerHanlder } from './application/query-handler/get.priceQuoteRequest.by.customer.handler';
import { GetPriceQuoteRequestsHandler } from './application/query-handler/list.priceQuoteRequest.handler';
import { ReadPriceQuoteRequestHandler } from './application/query-handler/read.priceQuoteRequest.handler';
import { PriceQuoteRequestDomain } from './domain/priceQuoteRequest.domain';
import { PriceQuoteRequestFactory } from './infrastructure/priceQuoteRequest.factory';
import { PriceQuoteRequestQuery } from './infrastructure/priceQuoteRequest.query';
import { PriceQuoteRequestRepository } from './infrastructure/priceQuoteRequest.repository';
import { PriceQuoteRequestController } from './presentation/priceQuoteRequest.controller';

const application = [
  GetPriceQuoteRequestsHandler,
  ReadPriceQuoteRequestHandler,
  CreatePriceQuoteRequestHandler,
  UpdatePriceQuoteRequestHandler,
  DeletePriceQuoteRequestHandler,
  GetPriceQuoteRequestByCustomerHanlder,
  SendPriceQuoteRequestHandler,
];

const infrastructure = [
  PriceQuoteRequestRepository,
  PriceQuoteRequestQuery,
  PriceQuoteRequestFactory,
];

const domain = [PriceQuoteRequestDomain];

@Module({
  imports: [CqrsModule, RmqModule],
  providers: [...application, ...infrastructure, ...domain],
  controllers: [PriceQuoteRequestController],
})
export class PriceQuoteRequestModule {}
