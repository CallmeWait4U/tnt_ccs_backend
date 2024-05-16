import { IQuery } from '@nestjs/cqrs';

export class GetSelectorEmployeesQuery implements IQuery {
  constructor(readonly tenantId: string) {}
}
