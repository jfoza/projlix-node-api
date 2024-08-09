import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { IAdminUserEntity } from '@/features/users/admin-user/interfaces/entities/admin-user.entity.interface';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { AdminUserFiltersDto } from '@/features/users/admin-user/presentation/dto/admin-user-filters.dto';

export interface IAdminUserRepository {
  findAll(
    adminUserFiltersDto: AdminUserFiltersDto,
  ): Promise<ILengthAwarePaginator>;
  findByUserId(userId: string): Promise<IUserEntity>;
  create(userId: string): Promise<IAdminUserEntity>;
}
