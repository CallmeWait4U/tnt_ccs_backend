import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @ApiProperty({ enum: [0, 1, 2] })
  @IsNumber()
  @IsNotEmpty()
  type: number;
}
