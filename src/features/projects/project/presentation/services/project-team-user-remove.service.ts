import { IProjectTeamUserRemoveService } from '@/features/projects/project/interfaces/services/project-team-user-remove.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { ProjectTeamUserDto } from '@/features/projects/project/presentation/dto/project-team-user.dto';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { ITeamUserRepository } from '@/features/users/team-user/interfaces/repositories/team-user.repository.interface';
import { RulesEnum } from '@/common/enums/rules.enum';
import { ProfileUniqueNameEnum } from '@/common/enums/profile-unique-name.enum';
import { TeamUserValidations } from '@/features/users/team-user/application/validations/team-user.validations';
import { IProjectListByIdUseCase } from '@/features/projects/project/interfaces/use-cases/project-list-by-id.use-case.interface';

@Injectable()
export class ProjectTeamUserRemoveService
  extends Service
  implements IProjectTeamUserRemoveService
{
  private projectTeamUserDto: ProjectTeamUserDto;
  private project: IProjectEntity;
  private user: IUserEntity;

  @Inject('IProjectRepository')
  private readonly projectRepository: IProjectRepository;

  @Inject('ITeamUserRepository')
  private readonly teamUserRepository: ITeamUserRepository;

  @Inject('IProjectListByIdUseCase')
  private readonly projectListByIdUseCase: IProjectListByIdUseCase;

  handle(projectTeamUserDto: ProjectTeamUserDto): Promise<void> {
    this.projectTeamUserDto = projectTeamUserDto;

    const policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.PROJECTS_ADMIN_MASTER_TEAM_USER_DELETE):
        return this.removeByAdminMaster();

      case policy.haveRule(RulesEnum.PROJECTS_PROJECT_MANAGER_TEAM_USER_DELETE):
        return this.removeByProjectManager();

      case policy.haveRule(RulesEnum.PROJECTS_TEAM_LEADER_TEAM_USER_DELETE):
        return this.removeByTeamLeader();

      default:
        policy.policyException();
    }
  }

  private async removeByAdminMaster(): Promise<void> {
    await this.handleValidations();

    await this.removeTeamUser();
  }

  private async removeByProjectManager(): Promise<void> {
    await this.handleValidations();

    await this.canAccessProjects([this.project.id]);

    this.profileHierarchyValidation(
      this.user.profile.unique_name,
      ProfileUniqueNameEnum.PROFILES_BY_PROJECT_MANAGER,
    );

    await this.removeTeamUser();
  }

  private async removeByTeamLeader(): Promise<void> {
    await this.handleValidations();

    await this.canAccessProjects([this.project.id]);

    this.profileHierarchyValidation(
      this.user.profile.unique_name,
      ProfileUniqueNameEnum.PROFILES_BY_TEAM_LEADER,
    );

    await this.removeTeamUser();
  }

  private async handleValidations(): Promise<void> {
    this.project = await this.projectListByIdUseCase
      .setId(this.projectTeamUserDto.projectId)
      .setRelations(['team_users'])
      .execute();

    this.user = await TeamUserValidations.teamUserExists(
      this.projectTeamUserDto.teamUserId,
      this.teamUserRepository,
    );
  }

  private async removeTeamUser(): Promise<void> {
    const teamUserHasAlreadyAdded = this.project.team_users.some(
      (item) => item.id === this.user.team_user.id,
    );

    if (teamUserHasAlreadyAdded) {
      await this.projectRepository.removeTeamUserRelation(
        this.projectTeamUserDto,
      );
    }
  }
}
