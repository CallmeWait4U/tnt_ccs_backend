import { Expose } from 'class-transformer';

export class StatisticCustomerByTimeResult {
  @Expose()
  startDate: string;
  @Expose()
  endDate: string;
  @Expose()
  total: number;
}
export class StatisticCustomerBySourceResult {
  @Expose()
  source: number;
  @Expose()
  total: number;
}
export class StatisticCustomerByPhaseResult {
  @Expose()
  phaseName: string;
  @Expose()
  total: number;
}
export class StatisticCustomerByLocationResult {
  @Expose()
  location: string;
  @Expose()
  total: number;
}
export class StatisticCustomerByAgeResult {
  @Expose()
  age: number;
  @Expose()
  total: number;
}
export class StatisticCustomerResult {
  @Expose()
  ByTime: StatisticCustomerByTimeResult[];
  @Expose()
  BySource: StatisticCustomerBySourceResult[];
  @Expose()
  ByPhase: StatisticCustomerByPhaseResult[];
  @Expose()
  ByLocation: StatisticCustomerByLocationResult[];
  @Expose()
  ByAge: StatisticCustomerByAgeResult[];
}
