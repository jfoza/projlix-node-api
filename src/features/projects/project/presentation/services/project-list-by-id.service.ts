import { IProjectListByIdService } from '@/features/projects/project/interfaces/services/project-list-by-id.service.interface';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { ProjectValidations } from '@/features/projects/project/application/validations/project.validations';
import { Policy } from '@/acl/types/policy';
import { RulesEnum } from '@/common/enums/rules.enum';

@Injectable()
export class ProjectListByIdService
  extends Service
  implements IProjectListByIdService
{
  private id: string;

  @Inject('IProjectRepository')
  private readonly projectRepository: IProjectRepository;

  async handle(id: string): Promise<IProjectEntity> {
    this.id = id;

    const policy: Policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.PROJECTS_ADMIN_MASTER_VIEW):
        return await this.findByAdminMaster();

      case policy.haveRule(RulesEnum.PROJECTS_PROJECT_MANAGER_VIEW) ||
        policy.haveRule(RulesEnum.PROJECTS_TEAM_LEADER_VIEW) ||
        policy.haveRule(RulesEnum.PROJECTS_PROJECT_MEMBER_VIEW):
        return await this.findByAccess();

      default:
        policy.policyException();
    }
  }

  private async findByAdminMaster(): Promise<IProjectEntity> {
    return ProjectValidations.projectExists(this.id, this.projectRepository);
  }

  private async findByAccess(): Promise<IProjectEntity> {
    const project = await ProjectValidations.projectExists(
      this.id,
      this.projectRepository,
    );

    await this.canAccessProjects([project.id]);

    return project;
  }
}
