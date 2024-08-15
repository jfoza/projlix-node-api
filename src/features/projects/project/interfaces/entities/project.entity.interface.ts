import { IIconEntity } from '@/features/general/icons/interfaces/entities/icon.entity.interface';
import { ITagEntity } from '@/features/general/tags/interfaces/entities/tag.entity';
import { ITeamUserEntity } from '@/features/users/team-user/interfaces/entities/team-user.entity.interface';

export interface IProjectEntity {
  id: string;
  icon_id: string;
  name: string;
  description: string;
  unique_name: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  icon: IIconEntity;
  tags: ITagEntity[];
  team_users: ITeamUserEntity[];
}
