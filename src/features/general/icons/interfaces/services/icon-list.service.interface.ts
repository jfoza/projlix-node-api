import { IIconEntity } from '@/features/general/icons/interfaces/entities/icon.entity.interface';

export interface IIconListService {
  handle(): Promise<IIconEntity[]>;
}
