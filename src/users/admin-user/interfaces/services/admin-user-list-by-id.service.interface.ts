import { IUserEntity } from '@/users/user/interfaces/entities/user-entity.interface';

export interface IAdminUserListByIdService {
  handle(userId: string): Promise<IUserEntity>;
}
