import { IProjectAddTeamUserService } from '@/features/projects/project/interfaces/services/project-add-team-user.service.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { ProjectTeamUserDto } from '@/features/projects/project/presentation/dto/project-team-user.dto';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { ITeamUserRepository } from '@/features/users/team-user/interfaces/repositories/team-user.repository.interface';
import { RulesEnum } from '@/common/enums/rules.enum';
import { ProjectValidations } from '@/features/projects/project/application/validations/project.validations';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';
import { TeamUserValidations } from '@/features/users/team-user/application/validations/team-user.validations';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { ProfileUniqueNameEnum } from '@/common/enums/profile-unique-name.enum';

@Injectable()
export class ProjectAddTeamUserService
  extends Service
  implements IProjectAddTeamUserService
{
  private projectTeamUserDto: ProjectTeamUserDto;
  private project: IProjectEntity;
  private user: IUserEntity;

  @Inject('IProjectRepository')
  private readonly projectRepository: IProjectRepository;

  @Inject('ITeamUserRepository')
  private readonly teamUserRepository: ITeamUserRepository;

  handle(projectTeamUserDto: ProjectTeamUserDto): Promise<IProjectEntity> {
    this.projectTeamUserDto = projectTeamUserDto;

    const policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.PROJECTS_ADMIN_MASTER_TEAM_USER_INSERT):
        return this.addByAdminMaster();

      case policy.haveRule(RulesEnum.PROJECTS_PROJECT_MANAGER_TEAM_USER_INSERT):
        return this.addByProjectManager();

      case policy.haveRule(RulesEnum.PROJECTS_TEAM_LEADER_TEAM_USER_INSERT):
        return this.addByTeamLeader();

      default:
        policy.policyException();
    }
  }

  private async addByAdminMaster(): Promise<IProjectEntity> {
    await this.handleValidations();

    return await this.addTeamUser();
  }

  private async addByProjectManager(): Promise<IProjectEntity> {
    await this.handleValidations();

    await this.canAccessProjects([this.project.id]);

    this.profileHierarchyValidation(
      this.user.profile.unique_name,
      ProfileUniqueNameEnum.PROFILES_BY_PROJECT_MANAGER,
    );

    return await this.addTeamUser();
  }

  private async addByTeamLeader(): Promise<IProjectEntity> {
    await this.handleValidations();

    await this.canAccessProjects([this.project.id]);

    this.profileHierarchyValidation(
      this.user.profile.unique_name,
      ProfileUniqueNameEnum.PROFILES_BY_TEAM_LEADER,
    );

    return await this.addTeamUser();
  }

  private async handleValidations(): Promise<void> {
    this.project = await ProjectValidations.projectExists(
      this.projectTeamUserDto.project_id,
      this.projectRepository,
    );

    this.user = await TeamUserValidations.teamUserExists(
      this.projectTeamUserDto.team_user_id,
      this.teamUserRepository,
    );

    const teamUserHasAlreadyAdded = this.project.team_users.some(
      (item) => item.id === this.user.team_user.id,
    );

    if (teamUserHasAlreadyAdded) {
      throw new BadRequestException(
        ErrorMessagesEnum.TEAM_USER_ALREADY_ADDED_IN_PROJECT,
      );
    }
  }

  private async addTeamUser(): Promise<IProjectEntity> {
    await this.teamUserRepository.createProjectsRelation(this.user.team_user, [
      this.project.id,
    ]);

    this.project.team_users.push(this.user.team_user);

    return this.project;
  }
}
