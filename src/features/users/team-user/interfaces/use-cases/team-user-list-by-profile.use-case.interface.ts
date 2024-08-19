import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';

export interface ITeamUserListByProfileUseCase {
  setUserId(userId: string): this;
  setProfilesUniqueName(profilesUniqueName: string[]): this;
  execute(): Promise<IUserEntity>;
}
