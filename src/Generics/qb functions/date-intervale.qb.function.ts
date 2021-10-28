import { SelectQueryBuilder } from 'typeorm';

export function setDateInterval(
  qb: SelectQueryBuilder<any>,
  startDate: Date,
  endDate: Date,
  dateProperty = 'date',
) {
  if (startDate > endDate) {
    const aux = startDate;
    startDate = endDate;
    endDate = aux;
  }
  if (startDate) {
    qb.andWhere(`${dateProperty} >= :startDate`, { startDate });
  }
  if (endDate) {
    qb.andWhere(`${dateProperty} >= :endDate`, { endDate });
  }
}
