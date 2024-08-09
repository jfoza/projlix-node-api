import { IIconEntity } from '@/features/general/icons/interfaces/entities/icon.entity.interface';

export interface IIconListByIdService {
  handle(id: string): Promise<IIconEntity>;
}
