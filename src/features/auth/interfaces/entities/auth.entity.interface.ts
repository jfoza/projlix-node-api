import { UserEntity } from '@/features/users/user/domain/entities/user.entity';

export interface IAuthEntity {
  id: string;
  user_id: string;
  initial_date: Date;
  final_date: Date;
  token: string;
  ip_address: string;
  auth_type: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  user: UserEntity;
}
