import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IIconEntity } from '@/features/general/icons/interfaces/entities/icon.entity.interface';
import { ProjectEntity } from '@/features/projects/project/domain/entities/project.entity';
import { SectionEntity } from '@/features/projects/section/domain/entities/section.entity';

@Entity({ schema: 'general', name: 'icons' })
export class IconEntity implements IIconEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => ProjectEntity, (project) => project.icon)
  projects: ProjectEntity[];

  @OneToMany(() => SectionEntity, (section) => section.icon_id)
  sections: SectionEntity[];
}
