import { Inject, Injectable } from '@nestjs/common';

import { RulesEnum } from '@/shared/enums/rules.enum';
import { Service } from '@/features/base/presentation/services/service';
import { IAdminUserListService } from '@/features/users/admin-user/interfaces/services/admin-user-list.service.interface';
import { IAdminUserRepository } from '@/features/users/admin-user/interfaces/repositories/admin-user.repository.interface';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';

@Injectable()
export class AdminUserListService
  extends Service
  implements IAdminUserListService
{
  @Inject('IAdminUserRepository')
  private readonly adminUserRepository: IAdminUserRepository;

  async handle(): Promise<IUserEntity[]> {
    this.getPolicy().canValidate(RulesEnum.ADMIN_USERS_VIEW);

    return this.adminUserRepository.findAll();
  }
}
