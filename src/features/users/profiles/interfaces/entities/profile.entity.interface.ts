import { ProfileTypesEntity } from '@/features/users/profiles/domain/entities/profile-types.entity';
import { UserEntity } from '@/features/users/user/domain/entities/user.entity';

export interface IProfileEntity {
  id: string;
  profile_type_id: string;
  description: string;
  unique_name: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  profile_type: ProfileTypesEntity;
  users: UserEntity[];
}
