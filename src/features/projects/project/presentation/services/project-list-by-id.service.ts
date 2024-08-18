import { IProjectListByIdService } from '@/features/projects/project/interfaces/services/project-list-by-id.service.interface';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { Policy } from '@/acl/types/policy';
import { RulesEnum } from '@/common/enums/rules.enum';
import { IProjectListByIdUseCase } from '@/features/projects/project/interfaces/use-cases/project-list-by-id.use-case.interface';
import { ProfileUniqueNameEnum } from '@/common/enums/profile-unique-name.enum';

@Injectable()
export class ProjectListByIdService
  extends Service
  implements IProjectListByIdService
{
  private id: string;

  @Inject('IProjectListByIdUseCase')
  private readonly projectListByIdUseCase: IProjectListByIdUseCase;

  async handle(id: string): Promise<IProjectEntity> {
    this.id = id;

    const policy: Policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.PROJECTS_ADMIN_MASTER_VIEW):
        return await this.findByAdminMaster();

      case policy.haveRule(RulesEnum.PROJECTS_PROJECT_MANAGER_VIEW):
        return await this.findByProjectManager();

      case policy.haveRule(RulesEnum.PROJECTS_TEAM_LEADER_VIEW):
        return await this.findByTeamLeader();

      case policy.haveRule(RulesEnum.PROJECTS_PROJECT_MEMBER_VIEW):
        return await this.findByProjectMember();

      default:
        policy.policyException();
    }
  }

  private async findByAdminMaster(): Promise<IProjectEntity> {
    return await this.getProjectOrFail(
      ProfileUniqueNameEnum.PROFILES_BY_ADMIN_MASTER,
    );
  }

  private async findByProjectManager(): Promise<IProjectEntity> {
    const project = await this.getProjectOrFail(
      ProfileUniqueNameEnum.PROFILES_BY_PROJECT_MANAGER,
    );

    await this.canAccessProjects([project.id]);

    return project;
  }

  private async findByTeamLeader(): Promise<IProjectEntity> {
    const project = await this.getProjectOrFail(
      ProfileUniqueNameEnum.PROFILES_BY_TEAM_LEADER,
    );

    await this.canAccessProjects([project.id]);

    return project;
  }

  private async findByProjectMember(): Promise<IProjectEntity> {
    const project = await this.getProjectOrFail(
      ProfileUniqueNameEnum.PROFILES_BY_PROJECT_MEMBER,
    );

    await this.canAccessProjects([project.id]);

    return project;
  }

  private async getProjectOrFail(profiles: string[]): Promise<IProjectEntity> {
    const project = await this.projectListByIdUseCase
      .setId(this.id)
      .setRelations(['icon', 'tags.color', 'team_users.user.profile'])
      .execute();

    if (project.team_users.length > 0) {
      project.team_users.forEach((teamUser) => {
        teamUser.can = profiles.includes(teamUser.user.profile.unique_name);
      });
    }

    return project;
  }
}
