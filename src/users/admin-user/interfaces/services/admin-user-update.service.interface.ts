import { IUserEntity } from '@/users/user/interfaces/entities/user-entity.interface';
import { UpdateAdminUserDto } from '@/users/admin-user/presentation/dto/update-admin-user.dto';

export interface IAdminUserUpdateService {
  handle(
    id: string,
    updateAdminUserDto: UpdateAdminUserDto,
  ): Promise<IUserEntity>;
}
