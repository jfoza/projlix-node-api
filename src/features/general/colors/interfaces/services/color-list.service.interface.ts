import { IColorEntity } from '@/features/general/colors/interfaces/entities/color.entity.interface';

export interface IColorListService {
  handle(): Promise<IColorEntity[]>;
}
