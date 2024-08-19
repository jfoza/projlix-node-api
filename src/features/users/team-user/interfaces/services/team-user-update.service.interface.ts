import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { UpdateTeamUserDto } from '@/features/users/team-user/presentation/dto/update-team-user.dto';

export interface ITeamUserUpdateService {
  handle(
    id: string,
    updateTeamUserDto: UpdateTeamUserDto,
  ): Promise<IUserEntity>;
}
