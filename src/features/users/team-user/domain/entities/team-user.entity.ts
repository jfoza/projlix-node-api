import { ITeamUserEntity } from '@/features/users/team-user/interfaces/entities/team-user.entity.interface';
import { UserEntity } from '@/features/users/user/domain/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectEntity } from '@/features/projects/project/domain/entities/project.entity';

@Entity({ schema: 'user_conf', name: 'team_users' })
export class TeamUserEntity implements ITeamUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToOne(() => UserEntity, (user) => user.team_user)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @JoinTable({
    schema: 'user_conf',
    name: 'projects_team_users',
    joinColumn: {
      name: 'team_user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
  })
  @ManyToMany(
    () => ProjectEntity,
    (project: ProjectEntity) => project.team_users,
  )
  projects: ProjectEntity[];
}
