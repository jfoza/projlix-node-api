import { IAdminUserCreateService } from '@/users/admin-user/interfaces/services/admin-user-create.service.interface';
import { CreateAdminUserDto } from '@/users/admin-user/presentation/dto/create-admin-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IAdminUserCreateUseCase } from '@/users/admin-user/interfaces/use-cases/admin-user-create.use-case.interface';
import { IUserCreateUseCase } from '@/users/user/interfaces/use-cases/user-create.use-case.interface';
import { IUserEntity } from '@/users/user/interfaces/entities/user-entity.interface';

@Injectable()
export class AdminUserCreateService implements IAdminUserCreateService {
  @Inject('IUserCreateUseCase')
  private readonly userCreateUseCase: IUserCreateUseCase;

  @Inject('IAdminUserCreateUseCase')
  private readonly adminUserCreateUseCase: IAdminUserCreateUseCase;

  async handle(createAdminUserDto: CreateAdminUserDto): Promise<IUserEntity> {
    const userCreated: IUserEntity =
      await this.userCreateUseCase.execute(createAdminUserDto);

    await this.adminUserCreateUseCase.execute(userCreated.id);

    return userCreated;
  }
}
