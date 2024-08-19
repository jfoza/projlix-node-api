import { ProjectEntity } from '@/features/projects/project/domain/entities/project.entity';
import { ColorEntity } from '@/features/general/colors/domain/entities/color.entity';
import { IconEntity } from '@/features/general/icons/domain/entities/icon.entity';

export interface ISectionEntity {
  id: string;
  project_id: string;
  color_id: string;
  icon_id: string;
  name: string;
  section_order: number;
  created_at: Date;
  updated_at: Date;
  project: ProjectEntity;
  color: ColorEntity;
  icon: IconEntity;
}
