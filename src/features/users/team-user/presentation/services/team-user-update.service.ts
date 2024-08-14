import { ITeamUserUpdateService } from '@/features/users/team-user/interfaces/services/team-user-update.service.interface';
import { UpdateTeamUserDto } from '@/features/users/team-user/presentation/dto/update-team-user.dto';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { ITeamUserRepository } from '@/features/users/team-user/interfaces/repositories/team-user.repository.interface';
import { IProfileRepository } from '@/features/users/profiles/interfaces/repositories/profile.repository.interface';
import { Policy } from '@/acl/types/policy';
import { RulesEnum } from '@/common/enums/rules.enum';
import { ProfileValidations } from '@/features/users/profiles/application/validations/profile.validations';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';
import { IUserUpdateUseCase } from '@/features/users/user/interfaces/use-cases/user-update.use-case.interface';
import { UserTypesEnum } from '@/common/enums/user-types.enum';
import { ProfileUniqueNameEnum } from '@/common/enums/profile-unique-name.enum';
import { IProfileEntity } from '@/features/users/profiles/interfaces/entities/profile.entity.interface';

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
    const profiles = ProfileUniqueNameEnum.PROFILES_BY_TEAM_LEADER;

    await this.userExistsAndCanBeAccessed(profiles);
    await this.profileExistsAndCanBeUsed(profiles);
    await this.userUpdateUseCase.userEmailExists();

    return await this.userUpdateUseCase.update();
  }

  private async updateByProjectManager(): Promise<IUserEntity> {
    const profiles = ProfileUniqueNameEnum.PROFILES_BY_TEAM_LEADER;

    await this.userExistsAndCanBeAccessed(profiles);
    await this.profileExistsAndCanBeUsed(profiles);
    await this.userUpdateUseCase.userEmailExists();

    return await this.userUpdateUseCase.update();
  }

  private async updateByTeamLeader(): Promise<IUserEntity> {
    const profiles = ProfileUniqueNameEnum.PROFILES_BY_TEAM_LEADER;

    await this.userExistsAndCanBeAccessed(profiles);
    await this.profileExistsAndCanBeUsed(profiles);
    await this.userUpdateUseCase.userEmailExists();

    return await this.userUpdateUseCase.update();
  }

  async userExistsAndCanBeAccessed(profiles: string[]): Promise<void> {
    this.userUpdateUseCase.setId(this.id);
    this.userUpdateUseCase.setUserType(UserTypesEnum.OPERATIONAL);
    this.userUpdateUseCase.setUpdateUserDto(this.updateTeamUserDto);

    const user: IUserEntity = await this.userUpdateUseCase.userExists();

    this.profileHierarchyValidation(user.profile.unique_name, profiles);
  }

  async profileExistsAndCanBeUsed(profiles: string[]): Promise<void> {
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
}
