import { Inject } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import {
  CountCustomersPerPhaseItem,
  CountCustomersPerPhaseResult,
} from '../application/query/result/count.customers.per.phase.query.result';

export class StatisticQuery {
  @Inject()
  private readonly prisma: PrismaService;

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

    const date = new Date();
    const lastDateMonth = new Date(date.getTime() - 60 * 60 * 24 * 30 * 1000);
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
}
