import { Inject, Injectable } from '@nestjs/common';
import { IAdminUserListService } from '@/features/users/admin-user/interfaces/services/admin-user-list.service.interface';
import { IAdminUserRepository } from '@/features/users/admin-user/interfaces/repositories/admin-user.repository.interface';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { Service } from '@/common/presentation/services/service';
import { RulesEnum } from '@/common/enums/rules.enum';

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
