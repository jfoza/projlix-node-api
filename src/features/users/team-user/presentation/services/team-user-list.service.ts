import { ITeamUserListService } from '@/features/users/team-user/interfaces/services/team-user-list.service.interface';
import { TeamUserFiltersDto } from '@/features/users/team-user/presentation/dto/team-user-filters.dto';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { ITeamUserRepository } from '@/features/users/team-user/interfaces/repositories/team-user.repository.interface';
import { RulesEnum } from '@/common/enums/rules.enum';
import { ProjectValidations } from '@/features/projects/project/application/validations/project.validations';
import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';
import { ProfileUniqueNameEnum } from '@/common/enums/profile-unique-name.enum';
import { Policy } from '@/acl/types/policy';

@Injectable()
export class TeamUserListService
  extends Service
  implements ITeamUserListService
{
  private teamUserFiltersDto: TeamUserFiltersDto;

  @Inject('ITeamUserRepository')
  private readonly teamUserRepository: ITeamUserRepository;

  @Inject('IProjectRepository')
  private readonly projectRepository: IProjectRepository;

  async handle(
    teamUserFiltersDto: TeamUserFiltersDto,
  ): Promise<ILengthAwarePaginator> {
    this.teamUserFiltersDto = teamUserFiltersDto;

    const policy: Policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.TEAM_USERS_ADMIN_MASTER_VIEW):
        return await this.findByAdminMaster();

      case policy.haveRule(RulesEnum.TEAM_USERS_PROJECT_MANAGER_VIEW):
        return await this.findByProjectManager();

      case policy.haveRule(RulesEnum.TEAM_USERS_TEAM_LEADER_VIEW):
        return await this.findByTeamLeader();

      case policy.haveRule(RulesEnum.TEAM_USERS_PROJECT_MEMBER_VIEW):
        return await this.findByProjectMember();
    }
  }

  private async findByAdminMaster(): Promise<ILengthAwarePaginator> {
    return this.teamUserRepository.findAll(this.teamUserFiltersDto);
  }

  private async findByProjectManager(): Promise<ILengthAwarePaginator> {
    await this.handleValidateAccessProjects();

    this.teamUserFiltersDto.profilesUniqueName =
      ProfileUniqueNameEnum.PROFILES_BY_PROJECT_MANAGER;

    return this.teamUserRepository.findAll(this.teamUserFiltersDto);
  }

  private async findByTeamLeader(): Promise<ILengthAwarePaginator> {
    await this.handleValidateAccessProjects();

    this.teamUserFiltersDto.profilesUniqueName =
      ProfileUniqueNameEnum.PROFILES_BY_TEAM_LEADER;

    return this.teamUserRepository.findAll(this.teamUserFiltersDto);
  }

  private async findByProjectMember(): Promise<ILengthAwarePaginator> {
    await this.handleValidateAccessProjects();

    this.teamUserFiltersDto.profilesUniqueName =
      ProfileUniqueNameEnum.PROFILES_BY_PROJECT_MEMBER;

    return this.teamUserRepository.findAll(this.teamUserFiltersDto);
  }

  private async handleValidateAccessProjects(): Promise<void> {
    if (this.teamUserFiltersDto.projectsId) {
      await ProjectValidations.projectsExists(
        this.teamUserFiltersDto.projectsId,
        this.projectRepository,
      );

      await this.canAccessEachProject(
        this.teamUserFiltersDto.projectsId,
        ErrorMessagesEnum.PROJECT_NOT_ALLOWED_IN_TEAM_USERS,
      );
    } else {
      this.teamUserFiltersDto.projectsId = await this.getTeamUserProjectsId();
    }
  }
}
