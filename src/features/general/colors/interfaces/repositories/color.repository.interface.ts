import { ColorEntity } from '@/features/general/colors/domain/entities/color.entity';

export interface IColorRepository {
  findAll(): Promise<ColorEntity[]>;
  findById(id: string): Promise<ColorEntity>;
}
