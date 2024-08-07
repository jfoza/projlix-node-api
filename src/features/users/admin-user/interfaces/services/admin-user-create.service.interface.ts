import { CreateAdminUserDto } from '@/features/users/admin-user/presentation/dto/create-admin-user.dto';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';

export interface IAdminUserCreateService {
  handle(createAdminUserDto: CreateAdminUserDto): Promise<IUserEntity>;
}
