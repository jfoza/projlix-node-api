import { Inject, Injectable } from '@nestjs/common';
import { IAdminUserListService } from '@/users/admin-user/interfaces/services/admin-user-list.service.interface';
import { IAdminUserRepository } from '@/users/admin-user/interfaces/repositories/admin-user.repository.interface';
import { IUserEntity } from '@/users/user/interfaces/entities/user-entity.interface';

@Injectable()
export class AdminUserListService implements IAdminUserListService {
  @Inject('IAdminUserRepository')
  private readonly adminUserRepository: IAdminUserRepository;

  async handle(): Promise<IUserEntity[]> {
    return await this.adminUserRepository.findAll();
  }
}
