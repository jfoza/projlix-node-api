import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProfileTypesEntity } from '@/users/profiles/domain/entities/profile-types.entity';
import { UserEntity } from '@/users/user/domain/entities/user.entity';
import { IProfileEntity } from '@/users/profiles/interfaces/entities/profile.entity.interface';

@Entity({ schema: 'user_conf', name: 'profiles' })
export class ProfileEntity implements IProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  profile_type_id: string;

  @Column()
  description: string;

  @Column()
  unique_name: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(
    () => ProfileTypesEntity,
    (profile_type: ProfileTypesEntity) => profile_type.profiles,
  )
  @JoinColumn({ name: 'profile_type_id' })
  profile_type: ProfileTypesEntity;

  @OneToMany(() => UserEntity, (user) => user.profile)
  users: UserEntity[];
}
