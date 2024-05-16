import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetPriceQuoteRequestByCustomerDTO {
  @ApiProperty({ example: 'customerUUID', type: String })
  @IsNotEmpty()
  @IsString()
  customerUUID: string;
}
