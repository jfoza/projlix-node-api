import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';

export interface ITeamUserListByIdService {
  handle(userId: string): Promise<IUserEntity>;
}
