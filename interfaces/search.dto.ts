import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class SearchDTO {
  @IsNotEmpty()
  @IsNumber()
  readonly offset: number;

  @IsNotEmpty()
  @IsNumber()
  readonly limit: number;

  @IsOptional()
  @IsString()
  readonly searchModel?: string;
}
