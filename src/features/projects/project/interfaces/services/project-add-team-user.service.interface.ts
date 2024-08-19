import { ProjectTeamUserDto } from '@/features/projects/project/presentation/dto/project-team-user.dto';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';

export interface IProjectAddTeamUserService {
  handle(projectTeamUserDto: ProjectTeamUserDto): Promise<IProjectEntity>;
}
