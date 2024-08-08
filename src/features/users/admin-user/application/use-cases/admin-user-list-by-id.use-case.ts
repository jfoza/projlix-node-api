import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAdminUserListByIdUseCase } from '@/features/users/admin-user/interfaces/use-cases/admin-user-list-by-id.use-case.interface';
import { IAdminUserRepository } from '@/features/users/admin-user/interfaces/repositories/admin-user.repository.interface';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';

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
