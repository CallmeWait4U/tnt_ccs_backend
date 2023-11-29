import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  taxCode: string;

  @IsNotEmpty()
  @IsString()
  businessRegistrationNumber: string;

  @IsNotEmpty()
  @IsString()
  businessNationality: string;

  @IsNotEmpty()
  @IsString()
  businessIndustryId: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  domain: string;
}
