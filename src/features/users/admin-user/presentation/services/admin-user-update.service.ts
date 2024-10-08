import { Inject, Injectable } from '@nestjs/common';
import { IAdminUserUpdateService } from '@/features/users/admin-user/interfaces/services/admin-user-update.service.interface';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { IUserUpdateUseCase } from '@/features/users/user/interfaces/use-cases/user-update.use-case.interface';
import { UpdateAdminUserDto } from '@/features/users/admin-user/presentation/dto/update-admin-user.dto';
import { Service } from '@/common/presentation/services/service';
import { UserTypesEnum } from '@/common/enums/user-types.enum';
import { RulesEnum } from '@/common/enums/rules.enum';

@Injectable()
export class AdminUserUpdateService
  extends Service
  implements IAdminUserUpdateService
{
  @Inject('IUserUpdateUseCase')
  private readonly userUpdateUseCase: IUserUpdateUseCase;

  async handle(
    id: string,
    updateAdminUserDto: UpdateAdminUserDto,
  ): Promise<IUserEntity> {
    this.getPolicy().can(RulesEnum.ADMIN_USERS_UPDATE);

    this.userUpdateUseCase.setId(id);
    this.userUpdateUseCase.setUserType(UserTypesEnum.ADMINISTRATIVE);
    this.userUpdateUseCase.setUpdateUserDto(updateAdminUserDto);

    await this.userUpdateUseCase.userExists();
    await this.userUpdateUseCase.userEmailExists();

    return await this.userUpdateUseCase.update();
  }
}
