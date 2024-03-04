import { ApiProperty } from '@nestjs/swagger';
import { TypeProduct } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';
import { SearchDTO } from 'interfaces/search.dto';

export class GetProductsDTO extends SearchDTO {
  @ApiProperty({
    example: TypeProduct.CUSTOMER,
    enum: { CUSTOMER: 'CUSTOMER', OTHER: 'OTHER' },
  })
  @IsNotEmpty()
  @IsString()
  type: TypeProduct;
}
