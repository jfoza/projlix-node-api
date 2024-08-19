import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IconEntity } from '@/features/general/icons/domain/entities/icon.entity';
import { TagEntity } from '@/features/general/tags/domain/entities/tag.entity';
import { TeamUserEntity } from '@/features/users/team-user/domain/entities/team-user.entity';
import { SectionEntity } from '@/features/projects/section/domain/entities/section.entity';

@Entity({ schema: 'project', name: 'projects' })
export class ProjectEntity implements IProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  icon_id: string;

  @Column()
  name: string;

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

  @ManyToOne(() => IconEntity, (icon) => icon.projects)
  @JoinColumn({ name: 'icon_id' })
  icon: IconEntity;

  @OneToMany(() => SectionEntity, (section) => section.project_id)
  sections: SectionEntity[];

  @JoinTable({
    schema: 'project',
    name: 'projects_tags',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  @ManyToMany(() => TagEntity, (tag: TagEntity) => tag.projects)
  tags: TagEntity[];

  @ManyToMany(
    () => TeamUserEntity,
    (team_user: TeamUserEntity) => team_user.projects,
  )
  team_users: TeamUserEntity[];
}
