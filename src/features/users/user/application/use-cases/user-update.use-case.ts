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
import { AclService } from '@/acl/presentation/services/acl.service';
import { IUserUpdateStatus } from '@/features/users/admin-user/interfaces/responses/user-update-status.interface';

@Injectable()
export class UserUpdateUseCase implements IUserUpdateUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  @Inject(AclService)
  private readonly aclService: AclService;

  private id: string;
  private userType: UserTypesEnum;
  private updateUserDto: UpdateUserDto;
  private user: IUserEntity;

  setId(id: string): void {
    this.id = id;
  }

  setUserType(userType: UserTypesEnum): void {
    this.userType = userType;
  }

  setUpdateUserDto(updateUserDto: UpdateUserDto): void {
    this.updateUserDto = updateUserDto;
  }

  async userExists(): Promise<IUserEntity> {
    this.user = await this.userRepository.findById(this.id);

    if (!this.user) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    if (
      this.userType === UserTypesEnum.ADMINISTRATIVE &&
      !this.user.admin_user
    ) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    if (this.userType === UserTypesEnum.OPERATIONAL && !this.user.team_user) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return this.user;
  }

  async userEmailExists(): Promise<void> {
    const userEmailExists: IUserEntity = await this.userRepository.findByEmail(
      this.updateUserDto.email,
    );

    if (userEmailExists && userEmailExists.id !== this.id) {
      throw new BadRequestException(ErrorMessagesEnum.EMAIL_ALREADY_EXISTS);
    }
  }

  async update(): Promise<IUserEntity> {
    this.updateUserDto.short_name = Helper.shortStringGenerate(
      this.updateUserDto.name,
    );

    await this.aclService.invalidate(this.id);

    return await this.userRepository.update(this.id, this.updateUserDto);
  }

  async updateStatus(): Promise<IUserUpdateStatus> {
    const newStatus = !this.user.active;

    await this.userRepository.updateStatus(this.id, newStatus);

    return { id: this.id, active: newStatus };
  }

  getUser(): IUserEntity {
    return this.user;
  }
}
