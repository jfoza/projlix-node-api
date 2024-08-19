import { IProfileEntity } from '@/features/users/profiles/interfaces/entities/profile.entity.interface';
import { IProfileRepository } from '@/features/users/profiles/interfaces/repositories/profile.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';

export class ProfileValidations {
  static async profileExists(
    id: string,
    profileRepository: IProfileRepository,
  ): Promise<IProfileEntity> {
    const profile = await profileRepository.findById(id);

    if (!profile) {
      throw new NotFoundException(ErrorMessagesEnum.PROFILE_NOT_FOUND);
    }

    return profile;
  }
}
