import { SelectQueryBuilder } from 'typeorm';

export function paginateQbFunction(
  qb: SelectQueryBuilder<any>,
  pageSize: number,
  pageNumber = 1,
) {
  console.log((pageNumber - 1) * pageSize);
  qb.skip((pageNumber - 1) * pageSize);
  qb.take(pageSize);
}
