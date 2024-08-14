import { IIconEntity } from '@/features/general/icons/interfaces/entities/icon.entity.interface';

export interface IIconRepository {
  findAll(): Promise<IIconEntity[]>;
  findById(id: string): Promise<IIconEntity>;
  findByName(name: string): Promise<IIconEntity>;
}
