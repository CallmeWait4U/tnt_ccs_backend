import { ICommand } from '@nestjs/cqrs';

export class CreateProductCommand implements ICommand {
  name: string;
  code: string;
  features: string;
  quantity: number;
  description: string;
  price: number;
  unite: string;
  images: Express.Multer.File[];

  constructor(data: Partial<CreateProductCommand>) {
    Object.assign(this, data);
  }
}
