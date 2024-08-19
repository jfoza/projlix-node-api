import { SectionReorderDto } from '@/features/projects/section/presentation/dto/section-reorder.dto';

export interface ISectionReorderService {
  handle(id: string, sectionReorderDto: SectionReorderDto): Promise<void>;
}
