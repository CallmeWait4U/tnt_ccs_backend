import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductDTO {
  @ApiProperty({ example: 'sản phẩm', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false, example: '', type: String })
  @IsOptional()
  @IsString()
  code: string;

  @ApiProperty({ required: false, example: 'string', type: String })
  @IsOptional()
  @IsString()
  features: string;

  @ApiProperty({ example: 1, type: Number })
  @IsNotEmpty()
  @IsNumberString()
  quantity: number;

  @ApiProperty({ required: false, example: 'string', type: String })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: 1000, type: Number })
  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @ApiProperty({ required: false, example: 'string', type: String })
  @IsOptional()
  @IsString()
  unit: string;

  @ApiProperty({ example: false, type: Boolean })
  @IsNotEmpty()
  isChangeImage: boolean;

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
  images: Express.Multer.File[];
}
