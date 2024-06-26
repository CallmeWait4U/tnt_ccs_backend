import { ICommand } from '@nestjs/cqrs';

export class CreateProductCommand implements ICommand {
  name: string;
  code: string;
  features: string;
  quantity: number;
  description: string;
  price: number;
  unit: string;
  images: Express.Multer.File[];
  tenantId: string;

  constructor(data: Partial<CreateProductCommand>) {
    Object.assign(this, data);
  }
}
