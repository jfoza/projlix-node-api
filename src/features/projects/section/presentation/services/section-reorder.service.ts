import { ISectionReorderService } from '@/features/projects/section/interfaces/services/section-reorder.service.interface';
import { SectionReorderDto } from '@/features/projects/section/presentation/dto/section-reorder.dto';
import { Service } from '@/common/presentation/services/service';
import { Inject, Injectable } from '@nestjs/common';
import { RulesEnum } from '@/common/enums/rules.enum';
import { ISectionRepository } from '@/features/projects/section/interfaces/repositories/section.repository.interface';
import { SectionValidations } from '@/features/projects/section/application/validations/section.validations';

@Injectable()
export class SectionReorderService
  extends Service
  implements ISectionReorderService
{
  private id: string;
  private sectionReorderDto: SectionReorderDto;

  @Inject('ISectionRepository')
  private readonly sectionRepository: ISectionRepository;

  async handle(
    id: string,
    sectionReorderDto: SectionReorderDto,
  ): Promise<void> {
    this.id = id;
    this.sectionReorderDto = sectionReorderDto;

    const policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.SECTIONS_ORDER_ADMIN_MASTER_UPDATE):
        return await this.updateByAdminMaster();

      case policy.haveRule(RulesEnum.SECTIONS_ORDER_PROJECT_MANAGER_UPDATE) ||
        policy.haveRule(RulesEnum.SECTIONS_ORDER_TEAM_LEADER_UPDATE) ||
        policy.haveRule(RulesEnum.SECTIONS_ORDER_PROJECT_MEMBER_UPDATE):
        return await this.updateByAccess();
    }
  }

  private async updateByAdminMaster(): Promise<void> {
    await this.handleValidations();

    await this.sectionRepository.reorderSection(
      this.id,
      this.sectionReorderDto,
    );
  }

  private async updateByAccess(): Promise<void> {
    await this.handleValidations();

    await this.canAccessProjects([this.sectionReorderDto.projectId]);

    await this.sectionRepository.reorderSection(
      this.id,
      this.sectionReorderDto,
    );
  }

  private async handleValidations(): Promise<void> {
    const section = await SectionValidations.sectionExists(
      this.id,
      this.sectionRepository,
    );

    this.sectionReorderDto.projectId = section.project_id;
  }
}
