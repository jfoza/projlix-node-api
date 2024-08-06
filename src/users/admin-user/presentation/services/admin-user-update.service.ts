import { IAdminUserUpdateService } from '@/users/admin-user/interfaces/services/admin-user-update.service.interface';
import { UpdateAdminUserDto } from '@/users/admin-user/presentation/dto/update-admin-user.dto';
import { IUserEntity } from '@/users/user/interfaces/entities/user-entity.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IUserUpdateUseCase } from '@/users/user/interfaces/use-cases/user-update.use-case.interface';
import { UserTypesEnum } from '@/shared/enums/user-types.enum';
import { Service } from '@/base/presentation/services/service';

@Injectable()
export class AdminUserUpdateService
  extends Service
  implements IAdminUserUpdateService
{
  @Inject('IUserUpdateUseCase')
  private readonly userUpdateUseCase: IUserUpdateUseCase;

  handle(
    id: string,
    updateAdminUserDto: UpdateAdminUserDto,
  ): Promise<IUserEntity> {
    return this.userUpdateUseCase.execute(
      id,
      UserTypesEnum.ADMINISTRATIVE,
      updateAdminUserDto,
    );
  }
}
