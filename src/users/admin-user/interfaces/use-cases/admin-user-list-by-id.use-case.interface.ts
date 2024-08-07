import { IUserEntity } from '@/users/user/interfaces/entities/user-entity.interface';

export interface IAdminUserListByIdUseCase {
  execute(userId: string): Promise<IUserEntity>;
}
