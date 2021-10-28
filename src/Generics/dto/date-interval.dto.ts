import { IsDate, IsOptional, MinDate } from 'class-validator';
import { Type } from 'class-transformer';

export class DateIntervalDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate: Date;
}
