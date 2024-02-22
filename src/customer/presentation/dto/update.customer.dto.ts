import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class UpdateCustomerDTO {
  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: true, type: Boolean })
  @IsNotEmpty()
  @IsBoolean()
  isBusiness: boolean;

  @ApiProperty({ example: 1, type: Number })
  @IsNotEmpty()
  @IsNumber()
  source: number;

  @ApiProperty({ example: 1, type: Number })
  @IsNotEmpty()
  @IsNumber()
  city: number;

  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsString()
  detailAddress: string;

  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'String', type: String })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: {
      name: 'string',
      nationality: 'string',
      registrationNumber: 'string',
      taxCode: 'string',
      industryId: 'string',
      representativeName: 'string',
      representativeBirthday: new Date(),
      representativeCccd: 'string',
      representativePosition: 'string',
      representativeGender: 1,
      representativePhone: 'string',
      representativeEmail: 'string',
    },
    type: Object,
  })
  @IsObject()
  business: {
    name: string;
    nationality?: string;
    registrationNumber?: string;
    taxCode?: string;
    industryId?: string;
    representativeName?: string;
    representativeBirthday?: Date;
    representativeCccd?: string;
    representativePosition?: string;
    representativeGender?: number;
    representativePhone?: string;
    representativeEmail?: string;
  };

  @ApiProperty({
    example: {
      name: 'string',
      birthday: new Date(),
      cccd: 'string',
      gender: 1,
      nationality: 'string',
    },
    type: Object,
  })
  @IsObject()
  individual: {
    name: string;

    birthday: Date;

    cccd: string;

    gender: number;

    nationality: string;
  };
}
