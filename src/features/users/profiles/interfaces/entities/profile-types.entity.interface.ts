import { ProfileEntity } from '@/features/users/profiles/domain/entities/profile.entity';

export interface IProfileTypesEntity {
  id: string;
  description: string;
  unique_name: string;
  created_at: Date;
  updated_at: Date;
  profiles: ProfileEntity[];
}
