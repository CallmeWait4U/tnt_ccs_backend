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

  previousMonths(numMonth: number) {
    const date = new Date();
    const lastDateMonth = new Date(
      date.getTime() - 60 * 60 * 24 * 30 * 1000 * numMonth,
    );
    const month = lastDateMonth.getMonth();
    if (month === 1) {
      const year = lastDateMonth.getFullYear();
      if (
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
      ) {
        lastDateMonth.setDate(29);
      } else {
        lastDateMonth.setDate(28);
      }
    } else {
      if ([0, 2, 4, 6, 7, 9, 11].includes(month)) {
        lastDateMonth.setDate(31);
      } else {
        lastDateMonth.setDate(30);
      }
    }
    lastDateMonth.setHours(23);
    lastDateMonth.setMinutes(59);
    lastDateMonth.setSeconds(59);
    return lastDateMonth;
  }

  addDate(date: Date, num: number) {
    return new Date(date.getTime() + 60 * 60 * 24 * 1000 * num);
  }
}

@Global()
@Module({
  imports: [],
  providers: [UtilityImplement],
  exports: [UtilityImplement],
})
export class UtilityModule {}
