import { Inject } from '@nestjs/common';
import { StatusComplaint, StatusTask } from '@prisma/client';
import { OptionsStatisticEnum } from 'interfaces/options.statistic.enum';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import {
  CountActivitiesItem,
  CountActivitiesResult,
  CountStatusActivity,
} from '../application/query/result/count.activities.query.result';
import {
  CountComplaintItem,
  CountComplaintResult,
  CountStatusComplaint,
} from '../application/query/result/count.complaint.query.result';
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
  CountCustomersByLocationItem,
  CountCustomersByLocationResult,
} from '../application/query/result/count.customers.by.location.query.result';
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

  async countCustomersByLocation(
    tenantId: string,
  ): Promise<CountCustomersByLocationResult> {
    const [data, total] = await Promise.all([
      this.prisma.customer.findMany({ where: { tenantId } }),
      this.prisma.customer.count({ where: { tenantId } }),
    ]);
    const cities: string[] = [];
    const items: CountCustomersByLocationItem[] = [];
    for (const i of data) {
      if (i.city) {
        if (cities.includes(i.city)) {
          const idx = cities.indexOf(i.city);
          items[idx].numCustomer++;
        } else {
          cities.push(i.city);
          items.push({ city: i.city, numCustomer: 0 });
        }
      }
    }
    items.sort((a, b) => b.numCustomer - a.numCustomer);
    return {
      items:
        items.length > 3
          ? [
              items[0],
              items[1],
              items[2],
              {
                city: 'other',
                numCustomer:
                  total -
                  items[0].numCustomer -
                  items[1].numCustomer -
                  items[2].numCustomer,
              },
            ]
          : items,
      total: items.length > 3 ? 4 : items.length,
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
      if (tenant.createdDate.getFullYear() <= listTimes[0].getFullYear()) {
        for (
          let i = tenant.createdDate.getFullYear() - 1;
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
          time: listTimes[i].getFullYear(),
        });
      }
    }
    return { items, total: items.length };
  }

  async countComplaint(tenantId: string): Promise<CountComplaintResult> {
    const dataTypeComplaint = await this.prisma.typeComplaint.findMany({
      where: { tenantId },
    });
    const items: CountComplaintItem[] = [];
    for (const typeComplaint of dataTypeComplaint) {
      const classification: CountStatusComplaint[] = [
        { numComplaint: 0, status: StatusComplaint.PENDING },
        { numComplaint: 0, status: StatusComplaint.PROCESSING },
        { numComplaint: 0, status: StatusComplaint.REPROCESS },
        { numComplaint: 0, status: StatusComplaint.SOLVED },
      ];
      const complaints = await this.prisma.complaint.findMany({
        where: { typeComplaintUUID: typeComplaint.uuid },
        include: { listStatus: { orderBy: { date: 'desc' } } },
      });
      complaints.forEach((complaint) => {
        if (complaint.listStatus[0].status === StatusComplaint.PENDING) {
          classification[0].numComplaint++;
        } else if (
          complaint.listStatus[0].status === StatusComplaint.PROCESSING
        ) {
          classification[1].numComplaint++;
        } else if (
          complaint.listStatus[0].status === StatusComplaint.REPROCESS
        ) {
          classification[2].numComplaint++;
        } else {
          classification[3].numComplaint++;
        }
      });
      items.push({
        classification,
        typeComplaintName: typeComplaint.name,
      });
    }
    return { items, total: items.length };
  }

  async countActivities(tenantId: string): Promise<CountActivitiesResult> {
    const dataActivities = await this.prisma.activity.findMany({
      where: { tenantId },
    });
    const items: CountActivitiesItem[] = [];
    for (const activity of dataActivities) {
      const completedTask = await this.prisma.task.findMany({
        where: { activityUUID: activity.uuid, status: StatusTask.COMPLETED },
      });
      const inprogressTask = await this.prisma.task.findMany({
        where: { activityUUID: activity.uuid, status: StatusTask.COMPLETED },
      });
      const overdueTask = await this.prisma.task.findMany({
        where: { activityUUID: activity.uuid, status: StatusTask.COMPLETED },
      });
      const classification: CountStatusActivity[] = [
        { numTask: completedTask.length, status: StatusTask.COMPLETED },
        { numTask: inprogressTask.length, status: StatusTask.INPROGRESS },
        { numTask: overdueTask.length, status: StatusTask.OVERDUE },
      ];
      items.push({
        classification,
        activityName: activity.name,
      });
    }
    return { items, total: items.length };
  }
}
