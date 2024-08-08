import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserCreateUseCase } from '@/features/users/user/interfaces/use-cases/user-create.use-case.interface';
import { IUserRepository } from '@/features/users/user/interfaces/repositories/user.repository.interface';
import { IProfileRepository } from '@/features/users/profiles/interfaces/repositories/profile.repository.interface';
import { CreateUserDto } from '@/features/users/user/presentation/dto/create-user.dto';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { ErrorMessagesEnum } from '@/shared/enums/error-messages.enum';
import { IProfileEntity } from '@/features/users/profiles/interfaces/entities/profile.entity.interface';
import { ProfileUniqueNameEnum } from '@/shared/enums/profile-unique-name.enum';
import { Hash } from '@/shared/utils/hash';
import { Helper } from '@/shared/helpers';

@Injectable()
export class UserCreateUseCase implements IUserCreateUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  @Inject('IProfileRepository')
  private readonly profileRepository: IProfileRepository;

  async execute(createUserDto: CreateUserDto): Promise<IUserEntity> {
    const userEmailExists: IUserEntity = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (userEmailExists) {
      throw new BadRequestException(ErrorMessagesEnum.EMAIL_ALREADY_EXISTS);
    }

    const adminMasterProfile: IProfileEntity =
      await this.profileRepository.findByUniqueName(
        ProfileUniqueNameEnum.ADMIN_MASTER,
      );

    createUserDto.password = await Hash.createHash(createUserDto.password);
    createUserDto.short_name = Helper.shortStringGenerate(createUserDto.name);
    createUserDto.profile = adminMasterProfile.id;

    return await this.userRepository.create(createUserDto);
  }
}