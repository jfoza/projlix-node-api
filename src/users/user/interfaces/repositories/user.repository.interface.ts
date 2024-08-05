import { CreateUserDto } from '@/users/user/presentation/dto/create-user.dto';
import { IUserEntity } from '@/users/user/interfaces/entities/user-entity.interface';
import { UpdateUserDto } from '@/users/user/presentation/dto/update-user.dto';

export interface IUserRepository {
  findAll(): Promise<IUserEntity[]>;
  findById(id: string): Promise<IUserEntity>;
  findByEmail(email: string): Promise<IUserEntity>;
  create(createUserDto: CreateUserDto): Promise<IUserEntity>;
  updateStatus(userId: string, newStatus: boolean): Promise<void>;
  updatePassword(userId: string, newPassword: string): Promise<void>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<IUserEntity>;
}

export const IUserRepository = Symbol('IUserRepository');
