import { ISectionUpdateService } from '@/features/projects/section/interfaces/services/section-update.service.interface';
import { UpdateSectionDto } from '@/features/projects/section/presentation/dto/update-section.dto';
import { ISectionEntity } from '@/features/projects/section/interfaces/entities/section.entity.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { IColorRepository } from '@/features/general/colors/interfaces/repositories/color.repository.interface';
import { IIconRepository } from '@/features/general/icons/interfaces/repositories/icon.repository.interface';
import { ISectionRepository } from '@/features/projects/section/interfaces/repositories/section.repository.interface';
import { ColorValidations } from '@/features/general/colors/application/validations/color.validations';
import { IconValidations } from '@/features/general/icons/application/validations/icon.validations';
import { RulesEnum } from '@/common/enums/rules.enum';
import { SectionValidations } from '@/features/projects/section/application/validations/section.validations';

@Injectable()
export class SectionUpdateService
  extends Service
  implements ISectionUpdateService
{
  private id: string;
  private section: ISectionEntity;
  private updateSectionDto: UpdateSectionDto;

  @Inject('IColorRepository')
  private readonly colorRepository: IColorRepository;

  @Inject('IIconRepository')
  private readonly iconRepository: IIconRepository;

  @Inject('ISectionRepository')
  private readonly sectionRepository: ISectionRepository;

  async handle(
    id: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<ISectionEntity> {
    this.id = id;
    this.updateSectionDto = updateSectionDto;

    const policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.SECTIONS_ADMIN_MASTER_UPDATE):
        return await this.updateByAdminMaster();

      case policy.haveRule(RulesEnum.SECTIONS_PROJECT_MANAGER_UPDATE) ||
        policy.haveRule(RulesEnum.SECTIONS_TEAM_LEADER_UPDATE):
        return await this.updateByAccess();
    }
  }

  private async updateByAdminMaster(): Promise<ISectionEntity> {
    await this.handleValidations();

    return await this.sectionRepository.update(this.id, this.updateSectionDto);
  }

  private async updateByAccess(): Promise<ISectionEntity> {
    await this.handleValidations();

    await this.canAccessProjects([this.section.project.id]);

    return await this.sectionRepository.update(this.id, this.updateSectionDto);
  }

  private async handleValidations(): Promise<void> {
    this.section = await SectionValidations.sectionExists(
      this.id,
      this.sectionRepository,
    );

    await ColorValidations.colorExists(
      this.updateSectionDto.colorId,
      this.colorRepository,
    );

    await IconValidations.iconExists(
      this.updateSectionDto.iconId,
      this.iconRepository,
    );
  }
}
