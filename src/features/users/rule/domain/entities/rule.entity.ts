import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IRuleEntity } from '@/features/users/rule/interfaces/entities/rule.entity.interface';
import { ProfileEntity } from '@/features/users/profiles/domain/entities/profile.entity';

@Entity({ schema: 'user_conf', name: 'rules' })
export class RuleEntity implements IRuleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  subject: string;

  @Column()
  action: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToMany(() => ProfileEntity, (profile: ProfileEntity) => profile.rules)
  profiles: ProfileEntity[];
}
