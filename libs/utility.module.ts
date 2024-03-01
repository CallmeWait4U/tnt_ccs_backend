import { Global, Injectable, Module } from '@nestjs/common';
import moment from 'moment';

@Injectable()
export class UtilityImplement {
  buildSearch(item: any) {
    let value;
    if (item.valueType === 'text') {
      value = { contains: item.value };
    }
    if (item.valueType === 'number') {
      value = Number(item.value);
    }
    if (item.valueType === 'date') {
      const fromDate = moment(item.fromDate).toDate();
      const toDate = moment(item.toDate).toDate();
      value = { gte: fromDate, lt: toDate };
    }
    if (item.valueType === 'set') {
      value = { in: Array.from(item.value) };
    }
    if (item.valueType === 'boolean') {
      value = { eq: item.value };
    }

    return { value };
  }
}

@Global()
@Module({
  imports: [],
  providers: [UtilityImplement],
  exports: [UtilityImplement],
})
export class UtilityModule {}
