import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IconEntity } from '@/features/general/icons/domain/entities/icon.entity';
import { ProjectEntity } from '@/features/projects/project/domain/entities/project.entity';
import { ColorEntity } from '@/features/general/colors/domain/entities/color.entity';
import { ISectionEntity } from '@/features/projects/section/interfaces/entities/section.entity.interface';

@Entity({ schema: 'project', name: 'sections' })
export class SectionEntity implements ISectionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  project_id: string;

  @Column({ type: 'uuid' })
  color_id: string;

  @Column({ type: 'uuid' })
  icon_id: string;

  @Column()
  name: string;

  @Column()
  section_order: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => ProjectEntity, (project) => project.sections)
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @ManyToOne(() => ColorEntity, (color) => color.sections)
  @JoinColumn({ name: 'color_id' })
  color: ColorEntity;

  @ManyToOne(() => IconEntity, (icon) => icon.sections)
  @JoinColumn({ name: 'icon_id' })
  icon: IconEntity;
}
