import { UpdateUserDto } from '@/features/users/user/presentation/dto/update-user.dto';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { UserTypesEnum } from '@/common/enums/user-types.enum';

export interface IUserUpdateUseCase {
  execute(
    id: string,
    userType: UserTypesEnum,
    updateUserDto: UpdateUserDto,
  ): Promise<IUserEntity>;
}
