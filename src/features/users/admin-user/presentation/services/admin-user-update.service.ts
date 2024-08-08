import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/features/base/presentation/services/service';
import { IAdminUserUpdateService } from '@/features/users/admin-user/interfaces/services/admin-user-update.service.interface';
import { UserTypesEnum } from '@/shared/enums/user-types.enum';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { IUserUpdateUseCase } from '@/features/users/user/interfaces/use-cases/user-update.use-case.interface';
import { UpdateAdminUserDto } from '@/features/users/admin-user/presentation/dto/update-admin-user.dto';

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
