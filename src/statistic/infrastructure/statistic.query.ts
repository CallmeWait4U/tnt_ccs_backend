import { Inject } from '@nestjs/common';
import { OptionsStatisticEnum } from 'interfaces/options.statistic.enum';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  CountCustomerFollowingSourceItem,
  CountCustomerFollowingSourceResult,
} from '../application/query/result/count.customer.following.source.query.result';
import {
  CountCustomerPhaseByMonthItem,
  CountCustomerPhaseByMonthResult,
  CountCustomerPhaseItem,
} from '../application/query/result/count.customer.phase.by.month.query.result';
import {
  CountCustomersPerPhaseItem,
  CountCustomersPerPhaseResult,
} from '../application/query/result/count.customers.per.phase.query.result';
import { CountPriceQuoteAndBillResult } from '../application/query/result/count.priceQuote.bill.query.result';
import {
  CountPriceQuoteByMonthItem,
  CountPriceQuoteByMonthResult,
} from '../application/query/result/count.priceQuote.by.month.query.result';

export class StatisticQuery {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async countCustomerPerPhase(
    tenantId: string,
  ): Promise<CountCustomersPerPhaseResult> {
    const [dataPhase, dataCus, total] = await Promise.all([
      this.prisma.phase.findMany({
        where: { tenantId },
        include: {
          _count: { select: { customers: true } },
        },
      }),
      this.prisma.customer.findMany({
        where: { tenantId },
        include: { phasesCustomer: true },
      }),
      this.prisma.phase.count({ where: { tenantId } }),
    ]);

    const items: CountCustomersPerPhaseItem[] = [];
    const dataPreviousMonth: { uuid: string; numCustomer: number }[] = [];
    for (const i of dataPhase) {
      items.push({
        uuid: i.uuid,
        name: i.name,
        numCustomers: i._count.customers,
        isIncreased: true,
        ratioPreviousMonth: 0,
      });
      dataPreviousMonth.push({ uuid: i.uuid, numCustomer: 0 });
    }

    const lastDateMonth = this.util.previousMonths(1);
    for (const i of dataCus) {
      if (i.phasesCustomer[0].date.getTime() < lastDateMonth.getTime()) {
        let phaseUUID = i.phasesCustomer[0].phaseUUID;
        for (const phase of i.phasesCustomer) {
          if (phase.date.getTime() < lastDateMonth.getTime()) {
            phaseUUID = phase.phaseUUID;
            continue;
          }
          break;
        }
        dataPreviousMonth.forEach((i) => {
          if (i.uuid === phaseUUID) {
            i.numCustomer++;
          }
        });
      }
    }
    return {
      items: items.map((item) => {
        const customersPreviousMonth = dataPreviousMonth.filter(
          (i) => i.uuid === item.uuid,
        )[0].numCustomer;
        if (customersPreviousMonth > 0) {
          if (customersPreviousMonth > item.numCustomers) {
            item.isIncreased = false;
            item.ratioPreviousMonth =
              ((customersPreviousMonth - item.numCustomers) /
                customersPreviousMonth) *
              100;
          } else {
            item.isIncreased = true;
            item.ratioPreviousMonth =
              ((item.numCustomers - customersPreviousMonth) /
                customersPreviousMonth) *
              100;
          }
        } else {
          item.ratioPreviousMonth = -1;
        }
        return item;
      }),
      total,
    };
  }

  async countPriceQuoteAndBill(
    tenantId: string,
  ): Promise<CountPriceQuoteAndBillResult> {
    const [dataPriceQuote, numPriceQuotes] = await Promise.all([
      this.prisma.priceQuote.findMany({ where: { tenantId } }),
      this.prisma.priceQuote.count({ where: { tenantId } }),
    ]);
    const [dataBill, numBills] = await Promise.all([
      this.prisma.bill.findMany({ where: { tenantId } }),
      this.prisma.bill.count({ where: { tenantId } }),
    ]);
    const result: CountPriceQuoteAndBillResult = {
      numPriceQuotes,
      ratioPreviousMonthPriceQuote: 0,
      numBills,
      ratioPreviousMonthBill: 0,
    };
    let numPriceQuotesPreviousMonth = numPriceQuotes;
    let numBillsPreviousMonth = numBills;
    const lastDateMonth = this.util.previousMonths(1);
    for (const priceQuote of dataPriceQuote) {
      if (priceQuote.createdDate.getTime() > lastDateMonth.getTime()) {
        numPriceQuotesPreviousMonth--;
      }
    }
    for (const bill of dataBill) {
      if (bill.createdDate.getTime() > lastDateMonth.getTime()) {
        numBillsPreviousMonth--;
      }
    }

    if (numPriceQuotesPreviousMonth > 0) {
      result.ratioPreviousMonthPriceQuote =
        ((numPriceQuotes - numPriceQuotesPreviousMonth) /
          numPriceQuotesPreviousMonth) *
        100;
    } else {
      result.ratioPreviousMonthPriceQuote = -1;
    }
    if (numBillsPreviousMonth > 0) {
      result.ratioPreviousMonthBill =
        ((numBills - numBillsPreviousMonth) / numBillsPreviousMonth) * 100;
    } else {
      result.ratioPreviousMonthBill = -1;
    }
    return result;
  }

  async countCustomersFollowingSource(
    tenantId: string,
  ): Promise<CountCustomerFollowingSourceResult> {
    const data = await this.prisma.customer.findMany({ where: { tenantId } });
    const items: CountCustomerFollowingSourceItem[] = [];
    for (const customer of data) {
      const exist = items.findIndex((i) => i.sourceName === customer.source);
      if (exist === -1) {
        items.push({ sourceName: customer.source, numCustomers: 1 });
      } else {
        items[exist].numCustomers++;
      }
    }
    return {
      items,
      total: items.length,
    };
  }

  async countCustomerPhaseByMonth(
    tenantId: string,
    option: OptionsStatisticEnum,
  ): Promise<CountCustomerPhaseByMonthResult> {
    const dataCus = await this.prisma.customer.findMany({
      where: { tenantId },
      include: { phasesCustomer: true },
    });
    const dataPhase = await this.prisma.phase.findMany({ where: { tenantId } });

    const listTimes: Date[] = [new Date()];
    if (option !== OptionsStatisticEnum.ALL) {
      for (let i = 1; i < Number(option); i++) {
        listTimes.push(this.util.previousMonths(i));
      }
    } else {
      const tenant = await this.prisma.tenant.findFirst({
        where: { tenantId },
      });
      if (tenant.createdDate.getFullYear() < listTimes[0].getFullYear()) {
        for (
          let i = tenant.createdDate.getFullYear();
          i < listTimes[0].getFullYear();
          i++
        ) {
          listTimes.push(new Date(i, 11, 31, 23, 59, 59));
        }
      }
    }
    const items: CountCustomerPhaseByMonthItem[] = [];
    for (const time of listTimes) {
      const listPhase: CountCustomerPhaseItem[] = dataPhase.map((phase) => ({
        phaseUUID: phase.uuid,
        phaseName: phase.name,
        numCustomers: 0,
      }));
      dataCus.forEach((customer) => {
        let phaseUUID = '';
        for (const i of customer.phasesCustomer) {
          if (i.date.getTime() < time.getTime()) {
            phaseUUID = i.phaseUUID;
            continue;
          }
          break;
        }
        listPhase.forEach((i) => {
          if (i.phaseUUID === phaseUUID) {
            i.numCustomers++;
          }
        });
      });

      if (option !== OptionsStatisticEnum.ALL) {
        items.push({ listPhase, time: time.getMonth() + 1 });
      } else {
        items.push({ listPhase, time: time.getFullYear() + 1 });
      }
    }
    return { items, total: items.length };
  }

  async countPriceQuoteByMonth(
    tenantId: string,
    option: OptionsStatisticEnum,
  ): Promise<CountPriceQuoteByMonthResult> {
    const data = await this.prisma.priceQuote.findMany({
      where: { tenantId },
      include: { bill: true },
    });
    const listTimes: Date[] = [new Date()];
    if (option !== OptionsStatisticEnum.ALL) {
      for (let i = 1; i <= Number(option); i++) {
        listTimes.push(this.util.previousMonths(i));
      }
    } else {
      const tenant = await this.prisma.tenant.findFirst({
        where: { tenantId },
      });
      if (tenant.createdDate.getFullYear() < listTimes[0].getFullYear()) {
        for (
          let i = tenant.createdDate.getFullYear();
          i < listTimes[0].getFullYear();
          i++
        ) {
          listTimes.push(new Date(i, 11, 31, 23, 59, 59));
        }
      }
    }

    const items: CountPriceQuoteByMonthItem[] = [];
    for (let i = 0; i < listTimes.length - 1; i++) {
      let numPriceQuotes = 0;
      let numPriceQuotesConvertBill = 0;
      data.forEach((priceQuote) => {
        console.log(priceQuote.createdDate);
        console.log(listTimes[i]);
        if (
          priceQuote.createdDate.getTime() < listTimes[i].getTime() &&
          priceQuote.createdDate.getTime() > listTimes[i + 1].getTime()
        ) {
          numPriceQuotes++;
          if (priceQuote.bill && priceQuote.bill.length > 0) {
            numPriceQuotesConvertBill++;
          }
        }
      });

      if (option !== OptionsStatisticEnum.ALL) {
        items.push({
          numPriceQuotes,
          numPriceQuotesConvertBill,
          time: listTimes[i].getMonth() + 1,
        });
      } else {
        items.push({
          numPriceQuotes,
          numPriceQuotesConvertBill,
          time: listTimes[i].getFullYear() + 1,
        });
      }
    }
    return { items, total: items.length };
  }
}
