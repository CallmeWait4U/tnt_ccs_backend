import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNotificationDTO } from 'src/notification/presentation/dto/create.notification.dto';
import { PriceQuoteRequestQuery } from 'src/priceQuoteRequest/infrastructure/priceQuoteRequest.query';
import { PriceQuoteRequestRepository } from 'src/priceQuoteRequest/infrastructure/priceQuoteRequest.repository';
import { SendPriceQuoteRequestCommand } from '../command/send.priceQuoteRequest.command';

@CommandHandler(SendPriceQuoteRequestCommand)
export class SendPriceQuoteRequestHandler
  implements ICommandHandler<SendPriceQuoteRequestCommand, void>
{
  @Inject()
  private readonly priceQuoteRequestQuery: PriceQuoteRequestQuery;
  @Inject()
  private readonly priceQuoteRequestRepository: PriceQuoteRequestRepository;

  constructor(private readonly amqpService: AmqpConnection) {}

  async execute(command: SendPriceQuoteRequestCommand): Promise<void> {
    const customer = await this.priceQuoteRequestQuery.getCustomer(
      command.uuid,
      command.tenantId,
    );
    const listAccountEmployees =
      await this.priceQuoteRequestQuery.getListAccountEmployees(customer.uuid);
    if (listAccountEmployees.length > 0) {
      const payload: CreateNotificationDTO = {
        title: 'Yêu cầu báo giá mới ' + customer.uuid,
        content: 'Bạn nhận được 1 Yêu cầu báo giá mới.',
        time: new Date(),
        accountUUIDs: listAccountEmployees.map(
          (account) => account.accountUUID,
        ),
        tokens: listAccountEmployees.map((account) => account.token),
        tenantId: command.tenantId,
      };
      this.amqpService.publish('exchange1', 'notify.complaint', payload);
    }
    return await this.priceQuoteRequestRepository.updateStatus(
      command.uuid,
      command.tenantId,
    );
  }
}
