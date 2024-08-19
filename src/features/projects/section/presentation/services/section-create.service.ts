import { ISectionCreateService } from '@/features/projects/section/interfaces/services/section-create.service.interface';
import { CreateSectionDto } from '@/features/projects/section/presentation/dto/create-section.dto';
import { ISectionEntity } from '@/features/projects/section/interfaces/entities/section.entity.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { RulesEnum } from '@/common/enums/rules.enum';
import { IProjectListByIdUseCase } from '@/features/projects/project/interfaces/use-cases/project-list-by-id.use-case.interface';
import { IconValidations } from '@/features/general/icons/application/validations/icon.validations';
import { IColorRepository } from '@/features/general/colors/interfaces/repositories/color.repository.interface';
import { IIconRepository } from '@/features/general/icons/interfaces/repositories/icon.repository.interface';
import { ColorValidations } from '@/features/general/colors/application/validations/color.validations';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { ISectionRepository } from '@/features/projects/section/interfaces/repositories/section.repository.interface';

@Injectable()
export class SectionCreateService
  extends Service
  implements ISectionCreateService
{
  private createSectionDto: CreateSectionDto;
  private project: IProjectEntity;

  @Inject('IProjectListByIdUseCase')
  private readonly projectListByIdUseCase: IProjectListByIdUseCase;

  @Inject('IColorRepository')
  private readonly colorRepository: IColorRepository;

  @Inject('IIconRepository')
  private readonly iconRepository: IIconRepository;

  @Inject('ISectionRepository')
  private readonly sectionRepository: ISectionRepository;

  async handle(createSectionDto: CreateSectionDto): Promise<ISectionEntity> {
    this.createSectionDto = createSectionDto;

    const policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.SECTIONS_ADMIN_MASTER_INSERT):
        return await this.createByAdminMaster();

      case policy.haveRule(RulesEnum.SECTIONS_PROJECT_MANAGER_INSERT) ||
        policy.haveRule(RulesEnum.SECTIONS_TEAM_LEADER_INSERT):
        return await this.createByAccess();
    }
  }

  private async createByAdminMaster(): Promise<ISectionEntity> {
    await this.handleValidations();

    return await this.sectionRepository.create(this.createSectionDto);
  }

  private async createByAccess(): Promise<ISectionEntity> {
    await this.handleValidations();

    await this.canAccessProjects([this.project.id]);

    return await this.sectionRepository.create(this.createSectionDto);
  }

  private async handleValidations(): Promise<void> {
    this.project = await this.projectListByIdUseCase
      .setId(this.createSectionDto.projectId)
      .execute();

    await ColorValidations.colorExists(
      this.createSectionDto.colorId,
      this.colorRepository,
    );

    await IconValidations.iconExists(
      this.createSectionDto.iconId,
      this.iconRepository,
    );
  }
}
