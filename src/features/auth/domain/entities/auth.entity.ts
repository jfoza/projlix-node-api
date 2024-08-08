import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IAuthEntity } from '@/features/auth/interfaces/entities/auth.entity.interface';
import { UserEntity } from '@/features/users/user/domain/entities/user.entity';

@Entity({ schema: 'user_conf', name: 'auth' })
export class AuthEntity implements IAuthEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  initial_date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  final_date: Date;

  @Column()
  token: string;

  @Column()
  ip_address: string;

  @Column()
  auth_type: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.auth)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
