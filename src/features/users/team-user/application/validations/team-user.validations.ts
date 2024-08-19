import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { ITeamUserRepository } from '@/features/users/team-user/interfaces/repositories/team-user.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';

export class TeamUserValidations {
  static async teamUserExistsByUserId(
    userId: string,
    teamUserRepository: ITeamUserRepository,
  ): Promise<IUserEntity> {
    const user: IUserEntity = await teamUserRepository.findByUserId(userId);

    if (!user) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return user;
  }

  static async teamUserExists(
    id: string,
    teamUserRepository: ITeamUserRepository,
  ): Promise<IUserEntity> {
    const user: IUserEntity = await teamUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return user;
  }
}
