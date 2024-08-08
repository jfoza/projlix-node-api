import { ProfileEntity } from '@/features/users/profiles/domain/entities/profile.entity';

export interface IRuleEntity {
  id: string;
  description: string;
  subject: string;
  action: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  profiles: ProfileEntity[];
}
