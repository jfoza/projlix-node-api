import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { IAdminUserRepository } from '@/features/users/admin-user/interfaces/repositories/admin-user.repository.interface';
import { AdminUserEntity } from '@/features/users/admin-user/domain/entities/admin-user.entity';
import { UserEntity } from '@/features/users/user/domain/entities/user.entity';
import { IAdminUserEntity } from '@/features/users/admin-user/interfaces/entities/admin-user.entity.interface';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { paginate } from '@/common/domain/pagination';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { AdminUserFiltersDto } from '@/features/users/admin-user/presentation/dto/admin-user-filters.dto';
import { Repository, SelectQueryBuilder } from 'typeorm';

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

  async findAll(
    adminUserFiltersDto: AdminUserFiltersDto,
  ): Promise<ILengthAwarePaginator> {
    const queryBuilder: SelectQueryBuilder<IUserEntity> =
      this.getListBaseQueryFilters(adminUserFiltersDto);

    return paginate(queryBuilder, {
      page: adminUserFiltersDto.page,
      limit: adminUserFiltersDto.perPage,
    });
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
      .where('admin_user.id IS NOT NULL')
      .orderBy();
  }

  getListBaseQueryFilters(
    adminUserFiltersDto: AdminUserFiltersDto,
  ): SelectQueryBuilder<IUserEntity> {
    const queryBuilder = this.getListBaseQuery();

    queryBuilder
      .when(adminUserFiltersDto.name, (qb, name) =>
        qb.andWhere('user.name ILIKE :name', { name: `%${name}%` }),
      )
      .when(adminUserFiltersDto.email, (qb, email) =>
        qb.andWhere('user.email = :email', { email }),
      )
      .when(adminUserFiltersDto.columnName, (qb, columnName) =>
        qb.orderBy(`user.${columnName}`, adminUserFiltersDto.columnOrder),
      );

    return queryBuilder;
  }
}
