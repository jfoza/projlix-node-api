import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/features/base/presentation/services/service';
import { IAdminUserListByIdService } from '@/features/users/admin-user/interfaces/services/admin-user-list-by-id.service.interface';
import { IAdminUserListByIdUseCase } from '@/features/users/admin-user/interfaces/use-cases/admin-user-list-by-id.use-case.interface';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';

@Injectable()
export class AdminUserListByIdService
  extends Service
  implements IAdminUserListByIdService
{
  @Inject('IAdminUserListByIdUseCase')
  private readonly adminUserListByIdUseCase: IAdminUserListByIdUseCase;

  async handle(userId: string): Promise<IUserEntity> {
    return await this.adminUserListByIdUseCase.execute(userId);
  }
}
