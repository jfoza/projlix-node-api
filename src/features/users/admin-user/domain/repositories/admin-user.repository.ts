import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IAdminUserRepository } from '@/features/users/admin-user/interfaces/repositories/admin-user.repository.interface';
import { AdminUserEntity } from '@/features/users/admin-user/domain/entities/admin-user.entity';
import { UserEntity } from '@/features/users/user/domain/entities/user.entity';
import { IAdminUserEntity } from '@/features/users/admin-user/interfaces/entities/admin-user.entity.interface';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';

@Injectable()
export class AdminUserRepository implements IAdminUserRepository {
  @InjectRepository(AdminUserEntity)
  private readonly adminUserRepository: Repository<AdminUserEntity>;

  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  async create(userId: string): Promise<IAdminUserEntity> {
    const adminUser: AdminUserEntity = this.adminUserRepository.create({
      user_id: userId,
    });

    return await this.adminUserRepository.save(adminUser);
  }

  async findAll(): Promise<IUserEntity[]> {
    return this.getListBaseQuery().getMany();
  }

  async findByUserId(userId: string): Promise<IUserEntity> {
    const queryBuilder: SelectQueryBuilder<IUserEntity> =
      this.getListBaseQuery();

    return queryBuilder.andWhere('user.id = :userId', { userId }).getOne();
  }

  getListBaseQuery(): SelectQueryBuilder<IUserEntity> {
    return this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.short_name',
        'user.email',
        'user.active',
        'user.created_at',
        'admin_user',
        'profile',
      ])
      .innerJoinAndSelect('user.admin_user', 'admin_user')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('admin_user.id IS NOT NULL');
  }
}
