export interface ILengthAwarePaginator {
  current_page: number;
  data: any[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}
