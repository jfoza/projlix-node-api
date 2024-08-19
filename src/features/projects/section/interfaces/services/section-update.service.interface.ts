import { ISectionEntity } from '@/features/projects/section/interfaces/entities/section.entity.interface';
import { UpdateSectionDto } from '@/features/projects/section/presentation/dto/update-section.dto';

export interface ISectionUpdateService {
  handle(
    id: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<ISectionEntity>;
}
