import { SelectQueryBuilder } from 'typeorm';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';

type PaginationOptionsType = {
  page: number;
  perPage: number;
};

export async function paginate<T>(
  queryBuilder: SelectQueryBuilder<T>,
  options: PaginationOptionsType,
): Promise<ILengthAwarePaginator> {
  const { page, perPage } = options;
  const [items, total] = await queryBuilder
    .skip((page - 1) * perPage)
    .take(perPage)
    .getManyAndCount();

  const lastPage: number = Math.ceil(total / perPage);
  const from: number = total > 0 ? (page - 1) * perPage + 1 : 0;
  const to: number = Math.min(page * perPage, total);

  return {
    current_page: page,
    data: items,
    from,
    last_page: lastPage,
    per_page: perPage,
    to,
    total,
  };
}
