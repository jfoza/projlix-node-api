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
import { AdminUserEntity } from '@/users/admin-user/domain/entities/admin-user.entity';
import { ProfileEntity } from '@/users/profiles/domain/entities/profile.entity';
import { IUserEntity } from '@/users/user/interfaces/entities/user-entity.interface';
import { AuthEntity } from '@/auth/domain/entities/auth.entity';

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

  @OneToMany(() => AuthEntity, (auth: AuthEntity) => auth.user)
  auth: AuthEntity[];
}
