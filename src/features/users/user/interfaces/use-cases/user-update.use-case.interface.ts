import { UpdateUserDto } from '@/features/users/user/presentation/dto/update-user.dto';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { UserTypesEnum } from '@/common/enums/user-types.enum';
import { IUserUpdateStatus } from '@/features/users/admin-user/interfaces/responses/user-update-status.interface';

export interface IUserUpdateUseCase {
  setId(id: string): void;
  setUserType(userType: UserTypesEnum): void;
  setUpdateUserDto(updateUserDto: UpdateUserDto): void;
  userExists(): Promise<IUserEntity>;
  userEmailExists(): Promise<void>;
  update(): Promise<IUserEntity>;
  updateStatus(): Promise<IUserUpdateStatus>;
}
