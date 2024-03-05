import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDTO {
  @ApiProperty({ example: 'sản phẩm', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'NV-00001', type: String })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ required: false, example: 'string', type: String })
  @IsOptional()
  @IsString()
  features: string;

  @ApiProperty({ example: 1, type: Number })
  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @ApiProperty({ required: false, example: 'string', type: String })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: 1000, type: Number })
  @IsNotEmpty()
  @IsInt()
  price: number;

  @ApiProperty({ required: false, example: 'string', type: String })
  @IsOptional()
  @IsString()
  unite: string;
}
