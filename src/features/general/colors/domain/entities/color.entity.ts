import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IColorEntity } from '@/features/general/colors/interfaces/entities/color.entity.interface';
import { TagEntity } from '@/features/general/tags/domain/entities/tag.entity';
import { SectionEntity } from '@/features/projects/section/domain/entities/section.entity';

@Entity({ schema: 'general', name: 'colors' })
export class ColorEntity implements IColorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hexadecimal: string;

  @Column()
  rgba: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => TagEntity, (tag) => tag.color)
  tags: TagEntity[];

  @OneToMany(() => SectionEntity, (section) => section.color_id)
  sections: SectionEntity[];
}
