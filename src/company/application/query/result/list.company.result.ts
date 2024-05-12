import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

class CompanyResult {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  domain: string;
}
export class ListCompanyResult implements IQueryResult {
  @Expose()
  items: CompanyResult[];

  @Expose()
  total: number;
}
