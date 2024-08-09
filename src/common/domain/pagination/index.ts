import { SelectQueryBuilder } from 'typeorm';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';

type PaginationOptionsType = {
  page: number;
  limit: number;
};

export async function paginate<T>(
  queryBuilder: SelectQueryBuilder<T>,
  options: PaginationOptionsType,
): Promise<ILengthAwarePaginator> {
  const { page, limit } = options;
  const [items, total] = await queryBuilder
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  const lastPage: number = Math.ceil(total / limit);
  const from: number = total > 0 ? (page - 1) * limit + 1 : 0;
  const to: number = Math.min(page * limit, total);

  return {
    currentPage: page,
    data: items,
    from,
    lastPage: lastPage,
    perPage: limit,
    to,
    total,
  };
}
