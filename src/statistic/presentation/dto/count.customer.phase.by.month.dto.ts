import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { OptionsStatisticEnum } from 'interfaces/options.statistic.enum';

export class CountCustomerPhaseByMonthDTO {
  @ApiProperty({
    example: OptionsStatisticEnum.SIX_MONTH,
    enum: OptionsStatisticEnum,
  })
  @IsNotEmpty()
  @IsString()
  option: OptionsStatisticEnum;
}
