import { ICommand } from '@nestjs/cqrs';

export class UpdateProductCommand implements ICommand {
  uuid: string;
  name: string;
  code: string;
  features: string;
  quantity: number;
  description: string;
  price: number;
  unit: string;
  isChangeImage: boolean;
  images: Express.Multer.File[];

  constructor(data: Partial<UpdateProductCommand>) {
    Object.assign(this, data);
  }
}
