import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { ProfileEntity } from '@/features/users/profiles/domain/entities/profile.entity';
import { AdminUserEntity } from '@/features/users/admin-user/domain/entities/admin-user.entity';
import { AuthEntity } from '@/features/auth/domain/entities/auth.entity';
import { TeamUserEntity } from '@/features/users/team-user/domain/entities/team-user.entity';

@Entity({ schema: 'user_conf', name: 'users' })
export class UserEntity implements IUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  profile_id: string;

  @Column()
  name: string;

  @Column()
  short_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => ProfileEntity, (profile) => profile.users)
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;

  @OneToOne(
    () => AdminUserEntity,
    (admin_user: AdminUserEntity) => admin_user.user,
  )
  admin_user: AdminUserEntity;

  @OneToOne(() => TeamUserEntity, (team_user: TeamUserEntity) => team_user.user)
  team_user: TeamUserEntity;

  @OneToMany(() => AuthEntity, (auth: AuthEntity) => auth.user)
  auth: AuthEntity[];
}
