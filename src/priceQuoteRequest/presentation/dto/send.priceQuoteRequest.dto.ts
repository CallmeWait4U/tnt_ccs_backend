import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendPriceQuoteRequestDTO {
  @ApiProperty({ example: 'priceQuoteRequestUUID', type: String })
  @IsNotEmpty()
  @IsString()
  uuid: string;
}
