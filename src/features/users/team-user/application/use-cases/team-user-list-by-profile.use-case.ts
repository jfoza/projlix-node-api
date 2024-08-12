import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { TeamUserValidations } from '@/features/users/team-user/application/validations/team-user.validations';
import { Helper } from '@/common/helpers';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';
import { Service } from '@/common/presentation/services/service';
import { Inject, Injectable } from '@nestjs/common';
import { ITeamUserRepository } from '@/features/users/team-user/interfaces/repositories/team-user.repository.interface';
import { ITeamUserListByProfileUseCase } from '@/features/users/team-user/interfaces/use-cases/team-user-list-by-profile.use-case.interface';

@Injectable()
export class TeamUserListByProfileUseCase
  extends Service
  implements ITeamUserListByProfileUseCase
{
  private userId: string;
  private profilesUniqueName: string[];

  @Inject('ITeamUserRepository')
  private readonly teamUserRepository: ITeamUserRepository;

  async execute(): Promise<IUserEntity> {
    const user: IUserEntity = await TeamUserValidations.teamUserExistsByUserId(
      this.userId,
      this.teamUserRepository,
    );

    this.profileHierarchyValidation(
      user.profile.unique_name,
      this.profilesUniqueName,
    );

    const projectsId = Helper.pluck(user.team_user.projects, 'id');

    await this.canAccessProjects(
      projectsId,
      ErrorMessagesEnum.USER_NOT_ALLOWED,
    );

    return user;
  }

  setUserId(userId: string): this {
    this.userId = userId;

    return this;
  }

  setProfilesUniqueName(profilesUniqueName: string[]): this {
    this.profilesUniqueName = profilesUniqueName;

    return this;
  }
}
