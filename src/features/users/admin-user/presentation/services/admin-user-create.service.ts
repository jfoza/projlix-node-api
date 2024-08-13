import { IAdminUserCreateService } from '@/features/users/admin-user/interfaces/services/admin-user-create.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IUserCreateUseCase } from '@/features/users/user/interfaces/use-cases/user-create.use-case.interface';
import { IAdminUserCreateUseCase } from '@/features/users/admin-user/interfaces/use-cases/admin-user-create.use-case.interface';
import { CreateAdminUserDto } from '@/features/users/admin-user/presentation/dto/create-admin-user.dto';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { Service } from '@/common/presentation/services/service';
import { RulesEnum } from '@/common/enums/rules.enum';
import { IProfileEntity } from '@/features/users/profiles/interfaces/entities/profile.entity.interface';
import { ProfileUniqueNameEnum } from '@/common/enums/profile-unique-name.enum';
import { IProfileRepository } from '@/features/users/profiles/interfaces/repositories/profile.repository.interface';

@Injectable()
export class AdminUserCreateService
  extends Service
  implements IAdminUserCreateService
{
  @Inject('IUserCreateUseCase')
  private readonly userCreateUseCase: IUserCreateUseCase;

  @Inject('IAdminUserCreateUseCase')
  private readonly adminUserCreateUseCase: IAdminUserCreateUseCase;

  @Inject('IProfileRepository')
  private readonly profileRepository: IProfileRepository;

  async handle(createAdminUserDto: CreateAdminUserDto): Promise<IUserEntity> {
    this.getPolicy().can(RulesEnum.ADMIN_USERS_INSERT);

    const adminMasterProfile: IProfileEntity =
      await this.profileRepository.findByUniqueName(
        ProfileUniqueNameEnum.ADMIN_MASTER,
      );

    createAdminUserDto.profile = adminMasterProfile.id;

    const userCreated: IUserEntity =
      await this.userCreateUseCase.execute(createAdminUserDto);

    await this.adminUserCreateUseCase.execute(userCreated.id);

    return userCreated;
  }
}
