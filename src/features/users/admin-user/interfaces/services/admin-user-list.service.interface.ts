import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';

export interface IAdminUserListService {
  handle(): Promise<IUserEntity[]>;
}
