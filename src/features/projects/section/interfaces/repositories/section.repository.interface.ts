import { ISectionEntity } from '@/features/projects/section/interfaces/entities/section.entity.interface';
import { CreateSectionDto } from '@/features/projects/section/presentation/dto/create-section.dto';
import { SectionFiltersDto } from '@/features/projects/section/presentation/dto/section-filters.dto';
import { UpdateSectionDto } from '@/features/projects/section/presentation/dto/update-section.dto';
import { SectionReorderDto } from '@/features/projects/section/presentation/dto/section-reorder.dto';

export interface ISectionRepository {
  findAll(sectionFiltersDto: SectionFiltersDto): Promise<ISectionEntity[]>;
  findById(id: string): Promise<ISectionEntity>;
  create(createSectionDto: CreateSectionDto): Promise<ISectionEntity>;
  update(
    id: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<ISectionEntity>;
  remove(id: string): Promise<void>;
  reorderSection(
    id: string,
    sectionReorderDto: SectionReorderDto,
  ): Promise<void>;
}
