import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { CreateUserDto } from '@/features/users/user/presentation/dto/create-user.dto';

export interface IUserCreateUseCase {
  execute(createUserDto: CreateUserDto): Promise<IUserEntity>;
}
