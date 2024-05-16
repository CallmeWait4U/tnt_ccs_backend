import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendEmailTaskDTO {
  @ApiProperty({ required: false, example: 'Tiêu đề mail', type: String })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty({ example: 'Nội dung email', type: String })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 'taskUUID', type: String })
  @IsNotEmpty()
  @IsString()
  taskUUID: string;

  @ApiProperty({
    required: false,
    description: 'Attachments',
    type: 'array',
    items: {
      type: 'file',
      items: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  @IsOptional()
  files: Express.Multer.File[];
}
