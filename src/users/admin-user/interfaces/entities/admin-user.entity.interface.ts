import { UserEntity } from '@/users/user/domain/entities/user.entity';

export interface IAdminUserEntity {
  id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  user: UserEntity;
}
