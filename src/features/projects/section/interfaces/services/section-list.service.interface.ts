import { ISectionEntity } from '@/features/projects/section/interfaces/entities/section.entity.interface';
import { SectionFiltersDto } from '@/features/projects/section/presentation/dto/section-filters.dto';

export interface ISectionListService {
  handle(sectionFiltersDto: SectionFiltersDto): Promise<ISectionEntity[]>;
}
