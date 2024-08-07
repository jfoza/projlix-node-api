import { IAdminUserListByIdUseCase } from '@/users/admin-user/interfaces/use-cases/admin-user-list-by-id.use-case.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAdminUserRepository } from '@/users/admin-user/interfaces/repositories/admin-user.repository.interface';
import { ErrorMessagesEnum } from '@/shared/enums/error-messages.enum';
import { IUserEntity } from '@/users/user/interfaces/entities/user-entity.interface';

@Injectable()
export class AdminUserListByIdUseCase implements IAdminUserListByIdUseCase {
  @Inject('IAdminUserRepository')
  private readonly adminUserRepository: IAdminUserRepository;

  async execute(userId: string): Promise<IUserEntity> {
    const adminUser: IUserEntity =
      await this.adminUserRepository.findByUserId(userId);

    if (!adminUser) {
      throw new NotFoundException(ErrorMessagesEnum.USER_NOT_FOUND);
    }

    return adminUser;
  }
}
