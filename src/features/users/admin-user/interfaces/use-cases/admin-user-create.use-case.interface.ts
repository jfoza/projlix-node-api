import { IAdminUserEntity } from '@/features/users/admin-user/interfaces/entities/admin-user.entity.interface';

export interface IAdminUserCreateUseCase {
  execute(userId: string): Promise<IAdminUserEntity>;
}
