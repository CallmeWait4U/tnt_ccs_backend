import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDTO {
  @ApiProperty({ example: '123456', type: String })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({ example: '654321', type: String })
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @ApiProperty({ example: '654321', type: String })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
