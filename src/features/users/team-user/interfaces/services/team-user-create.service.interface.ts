import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { CreateTeamUserDto } from '@/features/users/team-user/presentation/dto/create-team-user.dto';

export interface ITeamUserCreateService {
  handle(createTeamUserDto: CreateTeamUserDto): Promise<IUserEntity>;
}
