import { Inject, Injectable } from '@nestjs/common';
import { IAdminUserListService } from '@/features/users/admin-user/interfaces/services/admin-user-list.service.interface';
import { IAdminUserRepository } from '@/features/users/admin-user/interfaces/repositories/admin-user.repository.interface';
import { Service } from '@/common/presentation/services/service';
import { RulesEnum } from '@/common/enums/rules.enum';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { AdminUserFiltersDto } from '@/features/users/admin-user/presentation/dto/admin-user-filters.dto';

@Injectable()
export class AdminUserListService
  extends Service
  implements IAdminUserListService
{
  @Inject('IAdminUserRepository')
  private readonly adminUserRepository: IAdminUserRepository;

  async handle(
    adminUserFiltersDto: AdminUserFiltersDto,
  ): Promise<ILengthAwarePaginator> {
    this.getPolicy().canValidate(RulesEnum.ADMIN_USERS_VIEW);

    return this.adminUserRepository.findAll(adminUserFiltersDto);
  }
}
