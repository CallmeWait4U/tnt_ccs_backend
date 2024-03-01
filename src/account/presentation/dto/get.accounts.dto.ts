import { ApiProperty } from '@nestjs/swagger';
import { TypeAccount } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';
import { SearchDTO } from 'interfaces/search.dto';

export class GetAccountsDTO extends SearchDTO {
  @ApiProperty({
    example: TypeAccount.CUSTOMER,
    enum: { CUSTOMER: 'CUSTOMER', OTHER: 'OTHER' },
  })
  @IsNotEmpty()
  @IsString()
  type: TypeAccount;
}
