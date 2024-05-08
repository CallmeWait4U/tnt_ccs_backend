import { ApiProperty } from '@nestjs/swagger';
import { TypeAccount } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountForCustomerDTO {
  @ApiProperty({ example: 'customerUUID', type: String })
  @IsNotEmpty()
  @IsString()
  customerUUID: string;

  @ApiProperty({ example: TypeAccount.CUSTOMER, enum: TypeAccount })
  @IsNotEmpty()
  @IsString()
  type: TypeAccount;
}
