import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { AdminUserFiltersDto } from '@/features/users/admin-user/presentation/dto/admin-user-filters.dto';

export interface IAdminUserListService {
  handle(
    adminUserFiltersDto: AdminUserFiltersDto,
  ): Promise<ILengthAwarePaginator>;
}
