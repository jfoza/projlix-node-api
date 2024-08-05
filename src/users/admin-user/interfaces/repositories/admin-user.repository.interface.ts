import { IUserEntity } from '@/users/user/interfaces/entities/user-entity.interface';
import { IAdminUserEntity } from '@/users/admin-user/interfaces/entities/admin-user.entity.interface';

export interface IAdminUserRepository {
  findAll(): Promise<IUserEntity[]>;
  findByUserId(userId: string): Promise<IUserEntity>;
  create(userId: string): Promise<IAdminUserEntity>;
}
