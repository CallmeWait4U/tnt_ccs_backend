import { ApiProperty } from '@nestjs/swagger';
import { StatusBill } from '@prisma/client';
import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

class ProductItem {
  @ApiProperty({ example: 'uuid', type: String })
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @ApiProperty({ example: 1, type: Number })
  @IsNotEmpty()
  @IsNumberString()
  quantity: number;

  @ApiProperty({ example: 1000, type: Number })
  @IsNotEmpty()
  @IsNumberString()
  fixedPrice: number;
}

export class CreateBillDTO {
  @ApiProperty({ required: false, example: '', type: String })
  @IsOptional()
  @IsString()
  code: string;

  @ApiProperty({ example: new Date('01-01-1998'), type: Date })
  @IsNotEmpty()
  @IsDateString()
  createdDate: Date;

  @ApiProperty({ example: StatusBill.PAID, enum: StatusBill })
  @IsNotEmpty()
  @IsString()
  status: StatusBill;

  @ApiProperty({ example: 'uuid', type: String })
  @IsNotEmpty()
  @IsString()
  customerUUID: string;

  @ApiProperty({ required: false, example: 'uuid', type: String })
  @IsOptional()
  @IsString()
  priceQuoteUUID?: string;

  @ApiProperty({
    example: [{ uuid: 'uuid', fixedPrice: 1000, quantity: 1 }],
    type: [ProductItem],
  })
  @IsNotEmpty()
  products: ProductItem[];
}
