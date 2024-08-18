import { ITeamUserCreateService } from '@/features/users/team-user/interfaces/services/team-user-create.service.interface';
import { CreateTeamUserDto } from '@/features/users/team-user/presentation/dto/create-team-user.dto';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { RulesEnum } from '@/common/enums/rules.enum';
import { IUserCreateUseCase } from '@/features/users/user/interfaces/use-cases/user-create.use-case.interface';
import { ITeamUserRepository } from '@/features/users/team-user/interfaces/repositories/team-user.repository.interface';
import { Policy } from '@/acl/types/policy';
import { ProfileValidations } from '@/features/users/profiles/application/validations/profile.validations';
import { IProfileRepository } from '@/features/users/profiles/interfaces/repositories/profile.repository.interface';
import { ProfileUniqueNameEnum } from '@/common/enums/profile-unique-name.enum';
import { Hash } from '@/common/utils/hash';
import { randomUUID } from 'node:crypto';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';
import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { ProjectValidations } from '@/features/projects/project/application/validations/project.validations';
import { ITeamUserEntity } from '@/features/users/team-user/interfaces/entities/team-user.entity.interface';
import { IProfileEntity } from '@/features/users/profiles/interfaces/entities/profile.entity.interface';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { Helper } from '@/common/helpers';

@Injectable()
export class TeamUserCreateService
  extends Service
  implements ITeamUserCreateService
{
  private createTeamUserDto: CreateTeamUserDto;
  private projects: IProjectEntity[];

  @Inject('IUserCreateUseCase')
  private readonly userCreateUseCase: IUserCreateUseCase;

  @Inject('ITeamUserRepository')
  private readonly teamUserRepository: ITeamUserRepository;

  @Inject('IProfileRepository')
  private readonly profileRepository: IProfileRepository;

  @Inject('IProjectRepository')
  private readonly projectRepository: IProjectRepository;

  async handle(createTeamUserDto: CreateTeamUserDto): Promise<IUserEntity> {
    this.createTeamUserDto = createTeamUserDto;

    const policy: Policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.TEAM_USERS_ADMIN_MASTER_INSERT):
        return await this.createByAdminMaster();

      case policy.haveRule(RulesEnum.TEAM_USERS_PROJECT_MANAGER_INSERT):
        return await this.createByProjectManager();

      case policy.haveRule(RulesEnum.TEAM_USERS_TEAM_LEADER_INSERT):
        return await this.createByTeamLeader();

      default:
        policy.policyException();
    }
  }

  async createByAdminMaster(): Promise<IUserEntity> {
    await this.handleValidations(
      ProfileUniqueNameEnum.PROFILES_BY_ADMIN_MASTER_IN_TEAM_USERS,
    );

    return await this.createTeamUser();
  }

  async createByProjectManager(): Promise<IUserEntity> {
    await this.handleValidations(
      ProfileUniqueNameEnum.PROFILES_BY_PROJECT_MANAGER,
    );

    await this.defineProjectsRelation();
    await this.canAccessEachProject(Helper.pluck(this.projects, 'id'));

    return await this.createTeamUser();
  }

  async createByTeamLeader(): Promise<IUserEntity> {
    await this.handleValidations(ProfileUniqueNameEnum.PROFILES_BY_TEAM_LEADER);
    await this.defineProjectsRelation();
    await this.canAccessEachProject(Helper.pluck(this.projects, 'id'));

    return await this.createTeamUser();
  }

  async handleValidations(profiles: string[]): Promise<void> {
    const profile: IProfileEntity = await ProfileValidations.profileExists(
      this.createTeamUserDto.profile,
      this.profileRepository,
    );

    this.profileHierarchyValidation(
      profile.unique_name,
      profiles,
      ErrorMessagesEnum.PROFILE_NOT_ALLOWED,
    );
  }

  async defineProjectsRelation(): Promise<void> {
    if (this.createTeamUserDto.projects.length > 0) {
      this.projects = await ProjectValidations.projectsExists(
        this.createTeamUserDto.projects,
        this.projectRepository,
      );
    } else {
      this.createTeamUserDto.projects = await this.getTeamUserProjectsId();
    }
  }

  async createTeamUser(): Promise<IUserEntity> {
    this.createTeamUserDto.password = await Hash.createHash(
      randomUUID.toString(),
    );

    const userCreated: IUserEntity = await this.userCreateUseCase.execute(
      this.createTeamUserDto,
    );

    const teamUser: ITeamUserEntity = await this.teamUserRepository.create(
      userCreated.id,
    );

    await this.teamUserRepository.saveProjectsRelation(
      teamUser,
      this.createTeamUserDto.projects,
    );

    return userCreated;
  }
}
