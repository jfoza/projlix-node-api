import { Inject, Injectable } from '@nestjs/common';
import { IAdminUserListService } from '@/users/admin-user/interfaces/services/admin-user-list.service.interface';
import { IAdminUserRepository } from '@/users/admin-user/interfaces/repositories/admin-user.repository.interface';
import { IUserEntity } from '@/users/user/interfaces/entities/user-entity.interface';
import { Service } from '@/base/presentation/services/service';
import { RulesEnum } from '@/shared/enums/rules.enum';

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
