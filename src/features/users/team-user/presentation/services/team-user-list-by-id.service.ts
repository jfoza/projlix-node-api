import { ITeamUserListByIdService } from '@/features/users/team-user/interfaces/services/team-user-list-by-id.service.interface';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { TeamUserValidations } from '@/features/users/team-user/application/validations/team-user.validations';
import { ITeamUserRepository } from '@/features/users/team-user/interfaces/repositories/team-user.repository.interface';
import { Policy } from '@/acl/types/policy';
import { RulesEnum } from '@/common/enums/rules.enum';
import { ProfileUniqueNameEnum } from '@/common/enums/profile-unique-name.enum';
import { ITeamUserListByProfileUseCase } from '@/features/users/team-user/interfaces/use-cases/team-user-list-by-profile.use-case.interface';

@Injectable()
export class TeamUserListByIdService
  extends Service
  implements ITeamUserListByIdService
{
  private userId: string;

  @Inject('ITeamUserRepository')
  private readonly teamUserRepository: ITeamUserRepository;

  @Inject('ITeamUserListByProfileUseCase')
  private readonly teamUserListByProfileUseCase: ITeamUserListByProfileUseCase;

  async handle(userId: string): Promise<IUserEntity> {
    this.userId = userId;

    const policy: Policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.TEAM_USERS_ADMIN_MASTER_VIEW):
        return this.findByAdminMaster();

      case policy.haveRule(RulesEnum.TEAM_USERS_PROJECT_MANAGER_VIEW):
        return this.findByProjectManager();

      case policy.haveRule(RulesEnum.TEAM_USERS_TEAM_LEADER_VIEW):
        return this.findByTeamLeader();

      case policy.haveRule(RulesEnum.TEAM_USERS_PROJECT_MEMBER_VIEW):
        return this.findByProjectMember();

      default:
        policy.policyException();
    }
  }

  private async findByAdminMaster(): Promise<IUserEntity> {
    return await TeamUserValidations.teamUserExistsByUserId(
      this.userId,
      this.teamUserRepository,
    );
  }

  private async findByProjectManager(): Promise<IUserEntity> {
    return await this.teamUserListByProfileUseCase
      .setUserId(this.userId)
      .setProfilesUniqueName(ProfileUniqueNameEnum.PROFILES_BY_PROJECT_MANAGER)
      .execute();
  }

  private async findByTeamLeader(): Promise<IUserEntity> {
    return await this.teamUserListByProfileUseCase
      .setUserId(this.userId)
      .setProfilesUniqueName(ProfileUniqueNameEnum.PROFILES_BY_TEAM_LEADER)
      .execute();
  }

  private async findByProjectMember(): Promise<IUserEntity> {
    return await this.teamUserListByProfileUseCase
      .setUserId(this.userId)
      .setProfilesUniqueName(ProfileUniqueNameEnum.PROFILES_BY_PROJECT_MEMBER)
      .execute();
  }
}
