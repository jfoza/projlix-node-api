import { ColorEntity } from '@/features/general/colors/domain/entities/color.entity';

export interface ITagEntity {
  id: string;
  color_id: string;
  name: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  color: ColorEntity;
}
