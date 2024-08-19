import { ISectionRemoveService } from '@/features/projects/section/interfaces/services/section-remove.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ISectionRepository } from '@/features/projects/section/interfaces/repositories/section.repository.interface';
import { Service } from '@/common/presentation/services/service';
import { RulesEnum } from '@/common/enums/rules.enum';
import { SectionValidations } from '@/features/projects/section/application/validations/section.validations';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';

@Injectable()
export class SectionRemoveService
  extends Service
  implements ISectionRemoveService
{
  private id: string;

  @Inject('ISectionRepository')
  private readonly sectionRepository: ISectionRepository;

  async handle(id: string): Promise<void> {
    this.id = id;

    const policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.SECTIONS_ADMIN_MASTER_DELETE):
        return await this.removeByAdminMaster();

      case policy.haveRule(RulesEnum.SECTIONS_PROJECT_MANAGER_DELETE) ||
        policy.haveRule(RulesEnum.SECTIONS_TEAM_LEADER_DELETE):
        return await this.removeByAccess();

      default:
        policy.policyException();
    }
  }

  private async removeByAdminMaster(): Promise<void> {
    await SectionValidations.sectionExists(this.id, this.sectionRepository);

    await this.sectionRepository.remove(this.id);
  }

  private async removeByAccess(): Promise<void> {
    const section = await SectionValidations.sectionExists(
      this.id,
      this.sectionRepository,
    );

    await this.canAccessProjects(
      [section.project.id],
      ErrorMessagesEnum.SECTION_NOT_ALLOWED,
    );

    await this.sectionRepository.remove(this.id);
  }
}
