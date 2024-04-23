import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
  @ApiProperty({ example: 'username1', type: String })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '123456', type: String })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'cocolala', type: String })
  @IsString()
  @IsNotEmpty()
  domain: string;
}
