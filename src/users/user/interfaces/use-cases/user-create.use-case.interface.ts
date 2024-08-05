import { CreateUserDto } from '@/users/user/presentation/dto/create-user.dto';
import { IUserEntity } from '@/users/user/interfaces/entities/user-entity.interface';

export interface IUserCreateUseCase {
  execute(createUserDto: CreateUserDto): Promise<IUserEntity>;
}
