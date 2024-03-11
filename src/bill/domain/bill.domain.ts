import { v4 as uuidv4 } from 'uuid';
import { BillModel } from './bill.model';

export class BillDomain {
  async create(model: BillModel): Promise<BillModel> {
    model.uuid = uuidv4().toString();
    return model;
  }

  update(billCurrent: BillModel, billUpdate: Partial<BillModel>): BillModel {
    for (const [prop, value] of Object.entries(billCurrent)) {
      billCurrent[prop] = billUpdate[prop] ? billUpdate[prop] : value;
    }
    return billCurrent;
  }
}
