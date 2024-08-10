import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ITagEntity } from '@/features/general/tags/interfaces/entities/tag.entity';
import { ColorEntity } from '@/features/general/colors/domain/entities/color.entity';
import { ProjectEntity } from '@/features/projects/project/domain/entities/project.entity';

@Entity({ schema: 'general', name: 'tags' })
export class TagEntity implements ITagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  color_id: string;

  @Column()
  name: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => ColorEntity, (color) => color.tags)
  @JoinColumn({ name: 'color_id' })
  color: ColorEntity;

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
  @ManyToMany(() => ProjectEntity, (project: ProjectEntity) => project.tags)
  projects: ProjectEntity[];
}
