import { ISectionListService } from '@/features/projects/section/interfaces/services/section-list.service.interface';
import { SectionFiltersDto } from '@/features/projects/section/presentation/dto/section-filters.dto';
import { ISectionEntity } from '@/features/projects/section/interfaces/entities/section.entity.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { ISectionRepository } from '@/features/projects/section/interfaces/repositories/section.repository.interface';
import { RulesEnum } from '@/common/enums/rules.enum';
import { IProjectListByIdUseCase } from '@/features/projects/project/interfaces/use-cases/project-list-by-id.use-case.interface';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { IProjectListByUniqueNameUseCase } from '@/features/projects/project/interfaces/use-cases/project-list-by-unique-name.use-case.interface';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';

@Injectable()
export class SectionListService extends Service implements ISectionListService {
  private sectionFiltersDto: SectionFiltersDto;

  @Inject('ISectionRepository')
  private readonly sectionRepository: ISectionRepository;

  @Inject('IProjectListByIdUseCase')
  private readonly projectListByIdUseCase: IProjectListByIdUseCase;

  @Inject('IProjectListByUniqueNameUseCase')
  private readonly projectListByUniqueNameUseCase: IProjectListByUniqueNameUseCase;

  async handle(
    sectionFiltersDto: SectionFiltersDto,
  ): Promise<ISectionEntity[]> {
    this.setSectionFiltersDto(sectionFiltersDto);

    const policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.SECTIONS_ADMIN_MASTER_VIEW):
        return await this.findByAdminMaster();

      case policy.haveRule(RulesEnum.SECTIONS_PROJECT_MANAGER_VIEW) ||
        policy.haveRule(RulesEnum.SECTIONS_TEAM_LEADER_VIEW) ||
        policy.haveRule(RulesEnum.SECTIONS_PROJECT_MEMBER_VIEW):
        return await this.findByAccess();

      default:
        policy.policyException();
    }
  }

  private setSectionFiltersDto(sectionFiltersDto: SectionFiltersDto): void {
    if (!sectionFiltersDto.projectId && !sectionFiltersDto.projectUniqueName) {
      throw new BadRequestException(
        ErrorMessagesEnum.PROJECT_ID_OR_PROJECT_UNIQUE_NAME_REQUIRED,
      );
    }

    this.sectionFiltersDto = sectionFiltersDto;
  }

  private async findByAdminMaster(): Promise<ISectionEntity[]> {
    return await this.sectionRepository.findAll(this.sectionFiltersDto);
  }

  private async findByAccess(): Promise<ISectionEntity[]> {
    const project = await this.getProjectOrFail();

    await this.canAccessProjects([project.id]);

    return await this.sectionRepository.findAll(this.sectionFiltersDto);
  }

  private async getProjectOrFail(): Promise<IProjectEntity> {
    if (this.sectionFiltersDto.projectId) {
      return await this.projectListByIdUseCase
        .setId(this.sectionFiltersDto.projectId)
        .execute();
    }

    if (this.sectionFiltersDto.projectUniqueName) {
      return await this.projectListByUniqueNameUseCase
        .setUniqueName(this.sectionFiltersDto.projectUniqueName)
        .execute();
    }
  }
}
