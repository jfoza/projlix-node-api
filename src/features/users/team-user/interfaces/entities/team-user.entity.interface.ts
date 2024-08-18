import { UserEntity } from '@/features/users/user/domain/entities/user.entity';
import { ProjectEntity } from '@/features/projects/project/domain/entities/project.entity';

export interface ITeamUserEntity {
  id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  user: UserEntity;
  projects: ProjectEntity[];
  can: boolean;
}
