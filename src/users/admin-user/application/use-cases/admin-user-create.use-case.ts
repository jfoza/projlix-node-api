import { IAdminUserCreateUseCase } from '@/users/admin-user/interfaces/use-cases/admin-user-create.use-case.interface';
import { IAdminUserEntity } from '@/users/admin-user/interfaces/entities/admin-user.entity.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IAdminUserRepository } from '@/users/admin-user/interfaces/repositories/admin-user.repository.interface';

@Injectable()
export class AdminUserCreateUseCase implements IAdminUserCreateUseCase {
  @Inject('IAdminUserRepository')
  private readonly adminUserRepository: IAdminUserRepository;

  async execute(userId: string): Promise<IAdminUserEntity> {
    return await this.adminUserRepository.create(userId);
  }
}
