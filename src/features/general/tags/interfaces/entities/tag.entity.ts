import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { IColorEntity } from '@/features/general/colors/interfaces/entities/color.entity.interface';

export interface ITagEntity {
  id: string;
  color_id: string;
  name: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  color: IColorEntity;
  projects: IProjectEntity[];
}
