import { ISectionRepository } from '@/features/projects/section/interfaces/repositories/section.repository.interface';
import { ISectionEntity } from '@/features/projects/section/interfaces/entities/section.entity.interface';
import { CreateSectionDto } from '@/features/projects/section/presentation/dto/create-section.dto';
import { SectionFiltersDto } from '@/features/projects/section/presentation/dto/section-filters.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectionEntity } from '@/features/projects/section/domain/entities/section.entity';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateSectionDto } from '@/features/projects/section/presentation/dto/update-section.dto';
import { SectionReorderRoutine } from '@/features/projects/section/domain/routines/section-reorder.routine';
import { SectionReorderDto } from '@/features/projects/section/presentation/dto/section-reorder.dto';

@Injectable()
export class SectionRepository implements ISectionRepository {
  @InjectRepository(SectionEntity)
  private readonly repository: Repository<SectionEntity>;

  @Inject(SectionReorderRoutine)
  private readonly sectionReorderRoutine: SectionReorderRoutine;

  async findAll(
    sectionFiltersDto: SectionFiltersDto,
  ): Promise<ISectionEntity[]> {
    const qb = this.repository
      .createQueryBuilder('section')
      .innerJoinAndSelect('section.project', 'project')
      .innerJoinAndSelect('section.color', 'color')
      .innerJoinAndSelect('section.icon', 'icon');

    return await qb
      .when(sectionFiltersDto.projectId, (qb) =>
        qb.andWhere('section.project_id = :projectId', {
          projectId: sectionFiltersDto.projectId,
        }),
      )
      .when(sectionFiltersDto.projectUniqueName, (qb) =>
        qb.andWhere('project.unique_name = :projectUniqueName', {
          projectUniqueName: sectionFiltersDto.projectUniqueName,
        }),
      )
      .orderBy('section.section_order', 'ASC')
      .getMany();
  }

  async findById(id: string): Promise<ISectionEntity> {
    return this.repository.findOne({
      where: { id },
      relations: ['project', 'icon', 'color'],
    });
  }

  async create(createSectionDto: CreateSectionDto): Promise<ISectionEntity> {
    const result = await this.repository
      .createQueryBuilder('section')
      .select('MAX(section.section_order)', 'maxOrder')
      .getRawOne();

    const newSectionOrder = result.maxOrder
      ? parseInt(result.maxOrder, 10) + 1
      : 1;

    const section = this.repository.create({
      project_id: createSectionDto.projectId,
      color_id: createSectionDto.colorId,
      icon_id: createSectionDto.iconId,
      name: createSectionDto.name,
      section_order: newSectionOrder,
    });

    return this.repository.save(section);
  }

  async update(
    id: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<ISectionEntity> {
    const section: ISectionEntity = await this.repository.preload({
      ...{
        color_id: updateSectionDto.colorId,
        icon_id: updateSectionDto.iconId,
        name: updateSectionDto.name,
      },
      id,
    });

    return await this.repository.save(section);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async reorderSection(
    id: string,
    sectionReorderDto: SectionReorderDto,
  ): Promise<void> {
    await this.sectionReorderRoutine
      .setSectionId(id)
      .setProjectId(sectionReorderDto.projectId)
      .setNewOrder(sectionReorderDto.newOrder)
      .run();
  }
}
