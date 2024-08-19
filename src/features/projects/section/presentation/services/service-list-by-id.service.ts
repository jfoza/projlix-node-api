import { ISectionListByIdService } from '@/features/projects/section/interfaces/services/section-list-by-id.service.interface';
import { ISectionEntity } from '@/features/projects/section/interfaces/entities/section.entity.interface';
import { Service } from '@/common/presentation/services/service';
import { Inject, Injectable } from '@nestjs/common';
import { ISectionRepository } from '@/features/projects/section/interfaces/repositories/section.repository.interface';
import { RulesEnum } from '@/common/enums/rules.enum';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';
import { SectionValidations } from '@/features/projects/section/application/validations/section.validations';

@Injectable()
export class ServiceListByIdService
  extends Service
  implements ISectionListByIdService
{
  private id: string;

  @Inject('ISectionRepository')
  private readonly sectionRepository: ISectionRepository;

  async handle(id: string): Promise<ISectionEntity> {
    this.id = id;

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

  private async findByAdminMaster(): Promise<ISectionEntity> {
    return await SectionValidations.sectionExists(
      this.id,
      this.sectionRepository,
    );
  }

  private async findByAccess(): Promise<ISectionEntity> {
    const section = await SectionValidations.sectionExists(
      this.id,
      this.sectionRepository,
    );

    await this.canAccessProjects(
      [section.project.id],
      ErrorMessagesEnum.SECTION_NOT_ALLOWED,
    );

    return section;
  }
}
