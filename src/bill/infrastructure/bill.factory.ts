import { Bill } from '@prisma/client';
import { BaseFactory } from 'libs/base.factory';
import { BillModel } from '../domain/bill.model';

export class BillFactory extends BaseFactory {
  createBillModel(bill: Bill | Partial<Bill> | null) {
    if (!bill) return null;

    return this.createModel(BillModel, {
      ...bill,
    });
  }

  createBillModels(bills: Bill[] | Partial<Bill>[] | null) {
    if (!bills) return null;
    return bills.map((bill) => this.createBillModel(bill));
  }
}
