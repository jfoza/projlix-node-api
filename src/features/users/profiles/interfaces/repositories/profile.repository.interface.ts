import { IProfileEntity } from '@/features/users/profiles/interfaces/entities/profile.entity.interface';
import { ProfileFiltersDto } from '@/features/users/profiles/presentation/dto/profile-filters.dto';

export interface IProfileRepository {
  findAll(profileFiltersDto: ProfileFiltersDto): Promise<IProfileEntity[]>;
  findById(id: string): Promise<IProfileEntity>;
  findByUniqueName(uniqueName: string): Promise<IProfileEntity>;
}
