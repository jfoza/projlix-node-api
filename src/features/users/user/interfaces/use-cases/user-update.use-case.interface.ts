import { UserTypesEnum } from '@/shared/enums/user-types.enum';
import { UpdateUserDto } from '@/features/users/user/presentation/dto/update-user.dto';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';

export interface IUserUpdateUseCase {
  execute(
    id: string,
    userType: UserTypesEnum,
    updateUserDto: UpdateUserDto,
  ): Promise<IUserEntity>;
}
