import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendChatForEmployeeDTO {
  @ApiProperty({ type: String })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  readonly receiverUUID: string;

  @ApiProperty({ type: String })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
