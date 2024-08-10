import { IIconEntity } from '@/features/general/icons/interfaces/entities/icon.entity.interface';
import { ITagEntity } from '@/features/general/tags/interfaces/entities/tag.entity';

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
}
