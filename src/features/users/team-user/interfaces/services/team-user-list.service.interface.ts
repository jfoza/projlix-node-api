import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { TeamUserFiltersDto } from '@/features/users/team-user/presentation/dto/team-user-filters.dto';

export interface ITeamUserListService {
  handle(
    teamUserFiltersDto: TeamUserFiltersDto,
  ): Promise<ILengthAwarePaginator>;
}
