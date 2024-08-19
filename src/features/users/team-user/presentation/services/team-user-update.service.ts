import { ITeamUserUpdateService } from '@/features/users/team-user/interfaces/services/team-user-update.service.interface';
import { UpdateTeamUserDto } from '@/features/users/team-user/presentation/dto/update-team-user.dto';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { IProfileRepository } from '@/features/users/profiles/interfaces/repositories/profile.repository.interface';
import { Policy } from '@/acl/types/policy';
import { RulesEnum } from '@/common/enums/rules.enum';
import { ProfileValidations } from '@/features/users/profiles/application/validations/profile.validations';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';
import { IUserUpdateUseCase } from '@/features/users/user/interfaces/use-cases/user-update.use-case.interface';
import { UserTypesEnum } from '@/common/enums/user-types.enum';
import { ProfileUniqueNameEnum } from '@/common/enums/profile-unique-name.enum';
import { IProfileEntity } from '@/features/users/profiles/interfaces/entities/profile.entity.interface';
import { ProjectValidations } from '@/features/projects/project/application/validations/project.validations';
import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { Helper } from '@/common/helpers';
import { ITeamUserRepository } from '@/features/users/team-user/interfaces/repositories/team-user.repository.interface';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';

@Injectable()
export class TeamUserUpdateService
  extends Service
  implements ITeamUserUpdateService
{
  private updateTeamUserDto: UpdateTeamUserDto;
  private id: string;

  @Inject('IUserUpdateUseCase')
  private readonly userUpdateUseCase: IUserUpdateUseCase;

  @Inject('IProfileRepository')
  private readonly profileRepository: IProfileRepository;

  @Inject('IProjectRepository')
  private readonly projectRepository: IProjectRepository;

  @Inject('ITeamUserRepository')
  private readonly teamUserRepository: ITeamUserRepository;

  async handle(
    id: string,
    updateTeamUserDto: UpdateTeamUserDto,
  ): Promise<IUserEntity> {
    this.id = id;
    this.updateTeamUserDto = updateTeamUserDto;

    const policy: Policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.TEAM_USERS_ADMIN_MASTER_UPDATE):
        return await this.updateByAdminMaster();

      case policy.haveRule(RulesEnum.TEAM_USERS_PROJECT_MANAGER_UPDATE):
        return await this.updateByProjectManager();

      case policy.haveRule(RulesEnum.TEAM_USERS_TEAM_LEADER_UPDATE):
        return await this.updateByTeamLeader();

      default:
        policy.policyException();
    }
  }

  private async updateByAdminMaster(): Promise<IUserEntity> {
    const profiles = ProfileUniqueNameEnum.PROFILES_BY_ADMIN_MASTER;

    await this.userExistsAndCanBeAccessed(profiles);
    await this.profileExistsAndCanBeUsed(profiles);
    await this.userUpdateUseCase.userEmailExists();
    await this.projectsExists();

    return await this.update();
  }

  private async updateByProjectManager(): Promise<IUserEntity> {
    const profiles = ProfileUniqueNameEnum.PROFILES_BY_PROJECT_MANAGER;

    await this.userExistsAndCanBeAccessed(profiles);
    await this.profileExistsAndCanBeUsed(profiles);
    await this.userUpdateUseCase.userEmailExists();
    await this.projectsExistsAndCanBeUsed();

    return await this.update();
  }

  private async updateByTeamLeader(): Promise<IUserEntity> {
    const profiles = ProfileUniqueNameEnum.PROFILES_BY_TEAM_LEADER;

    await this.userExistsAndCanBeAccessed(profiles);
    await this.profileExistsAndCanBeUsed(profiles);
    await this.userUpdateUseCase.userEmailExists();
    await this.projectsExistsAndCanBeUsed();

    return await this.update();
  }

  private async userExistsAndCanBeAccessed(profiles: string[]): Promise<void> {
    this.userUpdateUseCase.setId(this.id);
    this.userUpdateUseCase.setUserType(UserTypesEnum.OPERATIONAL);
    this.userUpdateUseCase.setUpdateUserDto(this.updateTeamUserDto);

    const user: IUserEntity = await this.userUpdateUseCase.userExists();

    this.profileHierarchyValidation(user.profile.unique_name, profiles);
  }

  private async profileExistsAndCanBeUsed(profiles: string[]): Promise<void> {
    const profile: IProfileEntity = await ProfileValidations.profileExists(
      this.updateTeamUserDto.profile,
      this.profileRepository,
    );

    this.profileHierarchyValidation(
      profile.unique_name,
      profiles,
      ErrorMessagesEnum.PROFILE_NOT_ALLOWED,
    );
  }

  private async projectsExists(): Promise<void> {
    if (this.updateTeamUserDto.projects.length > 0) {
      await ProjectValidations.projectsExists(
        this.updateTeamUserDto.projects,
        this.projectRepository,
      );
    }
  }

  private async projectsExistsAndCanBeUsed() {
    if (this.updateTeamUserDto.projects.length > 0) {
      const projects = await ProjectValidations.projectsExists(
        this.updateTeamUserDto.projects,
        this.projectRepository,
      );

      await this.canAccessEachProject(Helper.pluck(projects, 'id'));
    } else {
      this.updateTeamUserDto.projects = await this.getTeamUserProjectsId();
    }
  }

  private async update(): Promise<IUserEntity> {
    const user = await this.userUpdateUseCase.update();

    if (this.updateTeamUserDto.projects.length > 0) {
      const teamUser = this.userUpdateUseCase.getUser().team_user;

      await this.teamUserRepository.saveProjectsRelation(
        teamUser,
        this.updateTeamUserDto.projects,
      );
    }

    return user;
  }
}
