import { ISectionEntity } from '@/features/projects/section/interfaces/entities/section.entity.interface';
import { CreateSectionDto } from '@/features/projects/section/presentation/dto/create-section.dto';

export interface ISectionCreateService {
  handle(createSectionDto: CreateSectionDto): Promise<ISectionEntity>;
}
