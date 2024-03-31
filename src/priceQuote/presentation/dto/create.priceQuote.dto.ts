import { ApiProperty } from '@nestjs/swagger';
import { StatusPriceQuote } from '@prisma/client';
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
  negotiatedPrice: number;
}
export class CreatePriceQuoteDTO {
  @ApiProperty({ example: 'NV-00001', type: String })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: new Date('01-01-1998'), type: Date })
  @IsNotEmpty()
  @IsDateString()
  createdDate: Date;

  @ApiProperty({ example: StatusPriceQuote.CANCELED, enum: StatusPriceQuote })
  @IsNotEmpty()
  @IsString()
  status: StatusPriceQuote;

  @ApiProperty({ required: false, example: new Date('01-01-1998'), type: Date })
  @IsOptional()
  @IsDateString()
  sentDate: Date;

  @ApiProperty({ example: 'uuid', type: String })
  @IsNotEmpty()
  @IsString()
  customerUUID: string;

  @ApiProperty({ required: false, example: 'uuid', type: String })
  @IsOptional()
  @IsString()
  priceQuoteRequestUUID: string;

  @ApiProperty({
    example: [{ uuid: 'uuid', negotiatedPrice: 1000, quantity: 1 }],
    type: [ProductItem],
  })
  @IsNotEmpty()
  products: ProductItem[];
}
