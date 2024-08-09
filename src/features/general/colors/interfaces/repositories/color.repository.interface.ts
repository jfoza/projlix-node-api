import { IColorEntity } from '@/features/general/colors/interfaces/entities/color.entity.interface';

export interface IColorRepository {
  findAll(): Promise<IColorEntity[]>;
  findById(id: string): Promise<IColorEntity>;
}
