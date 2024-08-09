import { IColorEntity } from '@/features/general/colors/interfaces/entities/color.entity.interface';

export interface IColorListByIdService {
  handle(id: string): Promise<IColorEntity>;
}
