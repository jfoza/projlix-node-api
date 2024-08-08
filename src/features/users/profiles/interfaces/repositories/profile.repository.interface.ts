import { IProfileEntity } from '@/features/users/profiles/interfaces/entities/profile.entity.interface';

export interface IProfileRepository {
  findAll(): Promise<IProfileEntity[]>;
  findById(id: string): Promise<IProfileEntity>;
  findByUniqueName(uniqueName: string): Promise<IProfileEntity>;
}
