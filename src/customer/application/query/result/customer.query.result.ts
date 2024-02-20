import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class CustomerItem implements IQueryResult {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  isBusiness: boolean;

  @Expose()
  source?: number;

  @Expose()
  city?: number;

  @Expose()
  district?: string;

  @Expose()
  detailAddress?: string;

  @Expose()
  email?: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  description?: string;

  @Expose()
  receiveMail?: string;
}

export class ListCustomersResult implements IQueryResult {
  @Expose()
  items: CustomerItem[];

  @Expose()
  total: number;
}

export class BusinessResult implements IQueryResult {
  @Expose()
  name: string;

  @Expose()
  nationality?: string;

  @Expose()
  registrationNumber?: string;

  @Expose()
  taxCode?: string;

  @Expose()
  industryId?: string;

  @Expose()
  representativeName?: string;

  @Expose()
  representativeBirthday?: Date;

  @Expose()
  representativeCccd?: string;

  @Expose()
  representativePosition?: string;

  @Expose()
  representativePositon?: string;

  @Expose()
  representativeGender?: string;

  @Expose()
  representativePhone?: string;

  @Expose()
  representativeEmail?: string;
}

export class IndividualResult implements IQueryResult {
  @Expose()
  name: string;

  @Expose()
  birthday: Date;

  @Expose()
  cccd: string;

  @Expose()
  gender: string;

  @Expose()
  nationality: string;
}

export class GetCustomerResult implements IQueryResult {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  isBusiness: boolean;

  @Expose()
  source?: number;

  @Expose()
  city?: number;

  @Expose()
  district?: string;

  @Expose()
  detailAddress?: string;

  @Expose()
  email?: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  description?: string;

  @Expose()
  receiveMail?: string;

  @Expose()
  business?: BusinessResult;

  @Expose()
  individual?: IndividualResult;

  constructor({ business, individual, ...rest }: GetCustomerResult) {
    Object.assign(this, rest);
    this.business = business || new BusinessResult();
    this.individual = individual || new IndividualResult();
  }
}
