import { ITeamUserUpdateStatusService } from '@/features/users/team-user/interfaces/services/team-user-update-status.service.interface';
import { IUserUpdateStatus } from '@/features/users/admin-user/interfaces/responses/user-update-status.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IUserUpdateUseCase } from '@/features/users/user/interfaces/use-cases/user-update.use-case.interface';
import { Service } from '@/common/presentation/services/service';
import { Policy } from '@/acl/types/policy';
import { RulesEnum } from '@/common/enums/rules.enum';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { ProfileUniqueNameEnum } from '@/common/enums/profile-unique-name.enum';
import { UserTypesEnum } from '@/common/enums/user-types.enum';

@Injectable()
export class TeamUserUpdateStatusService
  extends Service
  implements ITeamUserUpdateStatusService
{
  private id: string;

  @Inject('IUserUpdateUseCase')
  private readonly userUpdateUseCase: IUserUpdateUseCase;

  handle(id: string): Promise<IUserUpdateStatus> {
    this.id = id;

    const policy: Policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.TEAM_USERS_ADMIN_MASTER_UPDATE):
        return this.updateByAdminMaster();

      case policy.haveRule(RulesEnum.TEAM_USERS_PROJECT_MANAGER_UPDATE):
        return this.updateByProjectManager();

      case policy.haveRule(RulesEnum.TEAM_USERS_TEAM_LEADER_UPDATE):
        return this.updateByTeamLeader();

      default:
        policy.policyException();
    }
  }

  private async updateByAdminMaster(): Promise<IUserUpdateStatus> {
    const profiles = ProfileUniqueNameEnum.PROFILES_BY_TEAM_LEADER;

    await this.userExistsAndCanBeAccessed(profiles);

    return await this.userUpdateUseCase.updateStatus();
  }

  private async updateByProjectManager(): Promise<IUserUpdateStatus> {
    const profiles = ProfileUniqueNameEnum.PROFILES_BY_TEAM_LEADER;

    await this.userExistsAndCanBeAccessed(profiles);

    return await this.userUpdateUseCase.updateStatus();
  }

  private async updateByTeamLeader(): Promise<IUserUpdateStatus> {
    const profiles = ProfileUniqueNameEnum.PROFILES_BY_TEAM_LEADER;

    await this.userExistsAndCanBeAccessed(profiles);

    return await this.userUpdateUseCase.updateStatus();
  }

  async userExistsAndCanBeAccessed(profiles: string[]): Promise<void> {
    this.userUpdateUseCase.setId(this.id);
    this.userUpdateUseCase.setUserType(UserTypesEnum.OPERATIONAL);

    const user: IUserEntity = await this.userUpdateUseCase.userExists();

    this.profileHierarchyValidation(user.profile.unique_name, profiles);
  }
}
