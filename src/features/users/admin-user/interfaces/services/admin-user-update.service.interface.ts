import { UpdateAdminUserDto } from '@/features/users/admin-user/presentation/dto/update-admin-user.dto';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';

export interface IAdminUserUpdateService {
  handle(
    id: string,
    updateAdminUserDto: UpdateAdminUserDto,
  ): Promise<IUserEntity>;
}
