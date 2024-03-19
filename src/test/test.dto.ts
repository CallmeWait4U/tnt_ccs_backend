import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class TestDTO {
  @ApiProperty({ example: true, type: Boolean })
  @IsNotEmpty()
  @Type(() => Boolean)
  createPhase: boolean;

  @ApiProperty({ example: true, type: Boolean })
  @IsNotEmpty()
  @Type(() => Boolean)
  createTenant: boolean;

  @ApiProperty({ example: true, type: Boolean })
  @IsNotEmpty()
  @Type(() => Boolean)
  createAccountEmployee: boolean;

  @ApiProperty({ example: true, type: Boolean })
  @IsNotEmpty()
  @Type(() => Boolean)
  createActivity: boolean;

  @ApiProperty({ example: true, type: Boolean })
  @IsNotEmpty()
  @Type(() => Boolean)
  createCus: boolean;

  @ApiProperty({ example: true, type: Boolean })
  @IsNotEmpty()
  @Type(() => Boolean)
  createTask: boolean;

  @ApiProperty({ example: true, type: Boolean })
  @IsNotEmpty()
  @Type(() => Boolean)
  createProduct: boolean;

  @ApiProperty({ example: true, type: Boolean })
  @IsNotEmpty()
  @Type(() => Boolean)
  createPriceQuoteRequest: boolean;

  @ApiProperty({ example: true, type: Boolean })
  @IsNotEmpty()
  @Type(() => Boolean)
  createPriceQuote: boolean;

  @ApiProperty({ example: true, type: Boolean })
  @IsNotEmpty()
  @Type(() => Boolean)
  createBill: boolean;
}
