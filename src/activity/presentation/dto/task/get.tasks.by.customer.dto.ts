import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class GetTasksByCustomer {
  @ApiProperty({ example: 'customerUUID', type: String })
  @IsNotEmpty()
  @IsString()
  customerUUID: string;

  @ApiProperty({ example: true, type: Boolean })
  @IsNotEmpty()
  @IsBoolean()
  history: boolean;
}
