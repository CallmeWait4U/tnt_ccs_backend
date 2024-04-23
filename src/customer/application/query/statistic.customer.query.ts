import { ICommand } from '@nestjs/cqrs';

export class StatisticCustomerQuery implements ICommand {
  constructor(readonly tenantId: string) {}
}
