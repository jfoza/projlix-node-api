import { ProjectTeamUserDto } from '@/features/projects/project/presentation/dto/project-team-user.dto';

export interface IProjectTeamUserRemoveService {
  handle(projectTeamUserDto: ProjectTeamUserDto): Promise<void>;
}
