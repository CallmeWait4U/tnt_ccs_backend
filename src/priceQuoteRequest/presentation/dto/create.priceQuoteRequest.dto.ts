import { ApiProperty } from '@nestjs/swagger';
import { StatusPriceQuoteRequest } from '@prisma/client';
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
}
export class CreatePriceQuoteRequestDTO {
  @ApiProperty({ example: 'NV-00001', type: String })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: new Date('01-01-1998'), type: Date })
  @IsNotEmpty()
  @IsDateString()
  createdDate: Date;

  @ApiProperty({
    example: StatusPriceQuoteRequest.SENT,
    enum: StatusPriceQuoteRequest,
  })
  @IsNotEmpty()
  @IsString()
  status: StatusPriceQuoteRequest;

  @ApiProperty({ required: false, example: new Date('01-01-1998'), type: Date })
  @IsOptional()
  @IsDateString()
  sentDate: Date;

  @ApiProperty({ example: 'uuid', type: String })
  @IsNotEmpty()
  @IsString()
  customerUUID: string;

  @ApiProperty({
    example: [{ uuid: 'uuid', quantity: 1 }],
    type: [ProductItem],
  })
  @IsNotEmpty()
  products: ProductItem[];
}
