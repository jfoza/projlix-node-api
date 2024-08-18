import { ITeamUserEntity } from '@/features/users/team-user/interfaces/entities/team-user.entity.interface';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { TeamUserFiltersDto } from '@/features/users/team-user/presentation/dto/team-user-filters.dto';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';

export interface ITeamUserRepository {
  findAll(
    teamUserFiltersDto: TeamUserFiltersDto,
  ): Promise<ILengthAwarePaginator>;
  findByIds(ids: string[]): Promise<IUserEntity[]>;
  findById(id: string): Promise<IUserEntity>;
  findByUserId(userId: string): Promise<IUserEntity>;
  create(userId: string): Promise<ITeamUserEntity>;
  saveProjectsRelation(
    savedTeamUser: ITeamUserEntity,
    projectsId: string[],
  ): Promise<void>;
}
