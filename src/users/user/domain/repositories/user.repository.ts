import { IUserRepository } from '../../interfaces/repositories/user.repository.interface';
import { CreateUserDto } from '@/users/user/presentation/dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '@/users/user/presentation/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IUserEntity } from '@/users/user/interfaces/entities/user-entity.interface';

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
    return this.typeOrmRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<UserEntity> {
    return this.typeOrmRepository.findOne({
      where: { id: id },
      relations: ['admin_user'],
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
        short_name: updateUserDto.short_name,
        email: updateUserDto.email,
      },
      id,
    });

    return await this.typeOrmRepository.save(user);
  }
}
