import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserUpdateUseCase } from '@/features/users/user/interfaces/use-cases/user-update.use-case.interface';
import { IUserRepository } from '@/features/users/user/interfaces/repositories/user.repository.interface';
import { UpdateUserDto } from '@/features/users/user/presentation/dto/update-user.dto';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { UserTypesEnum } from '@/common/enums/user-types.enum';
import { Helper } from '@/common/helpers';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';

@Injectable()
export class UserUpdateUseCase implements IUserUpdateUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  private id: string;
  private userType: UserTypesEnum;
  private updateUserDto: UpdateUserDto;

  async execute(
    id: string,
    userType: UserTypesEnum,
    updateUserDto: UpdateUserDto,
  ): Promise<IUserEntity> {
    this.id = id;
    this.userType = userType;
    this.updateUserDto = updateUserDto;

    await this.userExists();
    await this.userEmailExists();

    updateUserDto.short_name = Helper.shortStringGenerate(updateUserDto.name);

    return this.userRepository.update(this.id, this.updateUserDto);
  }

  private async userExists(): Promise<IUserEntity> {
    const userExists: IUserEntity = await this.userRepository.findById(this.id);

    if (!userExists) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    if (
      this.userType === UserTypesEnum.ADMINISTRATIVE &&
      !userExists.admin_user
    ) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return userExists;
  }

  private async userEmailExists(): Promise<void> {
    const userEmailExists: IUserEntity = await this.userRepository.findByEmail(
      this.updateUserDto.email,
    );

    if (userEmailExists && userEmailExists.id !== this.id) {
      throw new BadRequestException(ErrorMessagesEnum.EMAIL_ALREADY_EXISTS);
    }
  }
}
