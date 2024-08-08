import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IAdminUserEntity } from '@/features/users/admin-user/interfaces/entities/admin-user.entity.interface';
import { UserEntity } from '@/features/users/user/domain/entities/user.entity';

@Entity({ schema: 'user_conf', name: 'admin_users' })
export class AdminUserEntity implements IAdminUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToOne(() => UserEntity, (user) => user.admin_user)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
