import { ProfileFiltersDto } from '@/features/users/profiles/presentation/dto/profile-filters.dto';
import { IProfileEntity } from '@/features/users/profiles/interfaces/entities/profile.entity.interface';

export interface IProfileListService {
  handle(profileFiltersDto: ProfileFiltersDto): Promise<IProfileEntity[]>;
}
