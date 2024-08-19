import { ITeamUserRepository } from '@/features/users/team-user/interfaces/repositories/team-user.repository.interface';
import { ITeamUserEntity } from '@/features/users/team-user/interfaces/entities/team-user.entity.interface';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/features/users/user/domain/entities/user.entity';
import { TeamUserEntity } from '@/features/users/team-user/domain/entities/team-user.entity';
import { paginate } from '@/common/domain/pagination';
import { TeamUserFiltersDto } from '@/features/users/team-user/presentation/dto/team-user-filters.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamUserRepository implements ITeamUserRepository {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  @InjectRepository(TeamUserEntity)
  private readonly teamUserRepository: Repository<TeamUserEntity>;

  async findAll(
    teamUserFiltersDto: TeamUserFiltersDto,
  ): Promise<ILengthAwarePaginator> {
    const queryBuilder: SelectQueryBuilder<IUserEntity> =
      this.getBaseQueryFilters(teamUserFiltersDto).when(
        teamUserFiltersDto.columnName,
        (qb) =>
          qb.orderBy(
            this.orderByGenerate(teamUserFiltersDto.columnName),
            teamUserFiltersDto.columnOrder,
          ),
        (qb) => qb.orderBy('user.created_at', 'DESC'),
      );

    return paginate(queryBuilder, {
      page: teamUserFiltersDto.page,
      perPage: teamUserFiltersDto.perPage,
    });
  }

  findById(id: string): Promise<IUserEntity> {
    const queryBuilder: SelectQueryBuilder<IUserEntity> = this.getBaseQuery();

    return queryBuilder.andWhere('team_user.id = :id', { id }).getOne();
  }

  findByIds(ids: string[]): Promise<IUserEntity[]> {
    const queryBuilder: SelectQueryBuilder<IUserEntity> = this.getBaseQuery();

    return queryBuilder
      .andWhere('team_user.id IN (:...ids)', { ids })
      .getMany();
  }

  findByUserId(userId: string): Promise<IUserEntity> {
    const queryBuilder: SelectQueryBuilder<IUserEntity> = this.getBaseQuery();

    return queryBuilder.andWhere('user.id = :userId', { userId }).getOne();
  }

  private getBaseQuery(): SelectQueryBuilder<IUserEntity> {
    return this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.short_name',
        'user.email',
        'user.active',
        'user.created_at',
        'profile.description AS profile_description',
        'profile.unique_name AS profile_unique_name',
      ])
      .innerJoinAndSelect('user.team_user', 'team_user')
      .innerJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('team_user.projects', 'projects');
  }

  async create(userId: string): Promise<ITeamUserEntity> {
    const teamUser: TeamUserEntity = this.teamUserRepository.create({
      user_id: userId,
    });

    return await this.teamUserRepository.save(teamUser);
  }

  async saveProjectsRelation(
    savedTeamUser: ITeamUserEntity,
    projectsId: string[],
  ): Promise<void> {
    await this.teamUserRepository
      .createQueryBuilder()
      .relation(TeamUserEntity, 'projects')
      .of(savedTeamUser.id)
      .add(projectsId);
  }

  private getBaseQueryFilters(
    teamUserFiltersDto: TeamUserFiltersDto,
  ): SelectQueryBuilder<IUserEntity> {
    return this.getBaseQuery()
      .when(teamUserFiltersDto.name, (qb) =>
        qb.andWhere('user.name ILIKE :name', {
          name: `%${teamUserFiltersDto.name}%`,
        }),
      )
      .when(teamUserFiltersDto.email, (qb, email) =>
        qb.andWhere('user.email = :email', { email }),
      )
      .when(teamUserFiltersDto.nameOrEmail, (qb, nameOrEmail) =>
        qb.andWhere(
          '(user.name LIKE :nameOrEmail OR user.email LIKE :nameOrEmail)',
          { nameOrEmail: `%${nameOrEmail}%` },
        ),
      )
      .when(teamUserFiltersDto.active !== undefined, (qb) =>
        qb.andWhere('user.active = :active', {
          active: teamUserFiltersDto.active,
        }),
      )
      .when(teamUserFiltersDto.profileId, (qb, profileId) =>
        qb.andWhere('profile.id = :profileId', { profileId }),
      )
      .when(teamUserFiltersDto.profilesUniqueName, (qb, profilesUniqueName) =>
        qb.andWhere('profile.unique_name IN (:...profilesUniqueName)', {
          profilesUniqueName,
        }),
      )
      .when(teamUserFiltersDto.projectsId, (qb, projectsId) =>
        qb.andWhere('projects.id IN (:...projectsId)', {
          projectsId,
        }),
      )
      .when(teamUserFiltersDto.columnName, (qb, columnName) =>
        qb.orderBy(`user.${columnName}`, teamUserFiltersDto.columnOrder),
      );
  }

  private orderByGenerate(columnName: string): string {
    switch (columnName) {
      case 'name':
        return 'user.name';

      case 'email':
        return 'user.email';

      case 'active':
        return 'user.email';

      default:
        return 'user.created_at';
    }
  }
}
