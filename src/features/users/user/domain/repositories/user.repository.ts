import { IUserRepository } from '@/features/users/user/interfaces/repositories/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/features/users/user/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@/features/users/user/presentation/dto/create-user.dto';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { UpdateUserDto } from '@/features/users/user/presentation/dto/update-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  @InjectRepository(UserEntity)
  private readonly typeOrmRepository: Repository<UserEntity>;

  async create(createUserDto: CreateUserDto): Promise<IUserEntity> {
    const user: UserEntity = this.typeOrmRepository.create({
      profile_id: createUserDto.profile,
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      short_name: createUserDto.short_name,
    });

    return await this.typeOrmRepository.save(user);
  }

  async findAll(): Promise<IUserEntity[]> {
    return this.typeOrmRepository.find();
  }

  async findByEmail(email: string): Promise<IUserEntity> {
    return this.typeOrmRepository.findOne({
      where: { email },
      relations: ['profile'],
    });
  }

  async findById(id: string): Promise<IUserEntity> {
    return this.typeOrmRepository.findOne({
      where: { id: id },
      relations: ['admin_user', 'team_user', 'profile'],
    });
  }

  async findByUserLoggedById(
    id: string,
    relation: string,
  ): Promise<IUserEntity> {
    return this.typeOrmRepository.findOne({
      where: { id: id },
      relations: ['admin_user', 'profile', relation],
    });
  }

  async updateStatus(userId: string, newStatus: boolean): Promise<void> {
    await this.typeOrmRepository.update(userId, { active: newStatus });
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    await this.typeOrmRepository.update(userId, { password: newPassword });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUserEntity> {
    const user: UserEntity = await this.typeOrmRepository.preload({
      ...{
        name: updateUserDto.name,
        profile_id: updateUserDto.profile,
        short_name: updateUserDto.short_name,
        email: updateUserDto.email,
      },
      id,
    });

    return await this.typeOrmRepository.save(user);
  }
}
