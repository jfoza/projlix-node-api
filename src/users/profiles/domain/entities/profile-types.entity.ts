import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProfileEntity } from '@/users/profiles/domain/entities/profile.entity';
import { IProfileTypesEntity } from '@/users/profiles/interfaces/entities/profile-types.entity.interface';

@Entity({ schema: 'user_conf', name: 'profile_types' })
export class ProfileTypesEntity implements IProfileTypesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  unique_name: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(
    () => ProfileEntity,
    (profile: ProfileEntity) => profile.profile_type,
  )
  profiles: ProfileEntity[];
}
