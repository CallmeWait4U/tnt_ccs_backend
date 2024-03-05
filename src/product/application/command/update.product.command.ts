import { ICommand } from '@nestjs/cqrs';

export class UpdateProductCommand implements ICommand {
  uuid: string;
  name: string;
  code: string;
  features: string;
  quantity: number;
  description: string;
  price: number;
  unite: string;

  constructor(data: Partial<UpdateProductCommand>) {
    Object.assign(this, data);
  }
}
