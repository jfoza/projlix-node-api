import { Inject, Injectable } from '@nestjs/common';
import { IAdminUserListByIdService } from '@/users/admin-user/interfaces/services/admin-user-list-by-id.service.interface';
import { IAdminUserListByIdUseCase } from '@/users/admin-user/interfaces/use-cases/admin-user-list-by-id.use-case.interface';
import { IUserEntity } from '@/users/user/interfaces/entities/user-entity.interface';

@Injectable()
export class AdminUserListByIdService implements IAdminUserListByIdService {
  @Inject('IAdminUserListByIdUseCase')
  private readonly adminUserListByIdUseCase: IAdminUserListByIdUseCase;

  async handle(userId: string): Promise<IUserEntity> {
    return await this.adminUserListByIdUseCase.execute(userId);
  }
}
