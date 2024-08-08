import { ProfileEntity } from '@/features/users/profiles/domain/entities/profile.entity';
import { AdminUserEntity } from '@/features/users/admin-user/domain/entities/admin-user.entity';

export interface IUserEntity {
  id: string;
  profile_id: string;
  name: string;
  short_name: string;
  email: string;
  password: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  profile: ProfileEntity;
  admin_user: AdminUserEntity;
}
