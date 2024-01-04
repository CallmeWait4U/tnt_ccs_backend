import { ApiProperty } from '@nestjs/swagger';
import { TypeAccount } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDTO {
  @ApiProperty({ example: 'user', type: String })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '123456', type: String })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '123456', type: String })
  @IsString()
  @IsNotEmpty()
  passwordConfirm: string;

  @ApiProperty({ enum: ['ADMIN', 'EMPLOYEE', 'CUSTOMER'] })
  @IsString()
  @IsNotEmpty()
  type: TypeAccount;
}
