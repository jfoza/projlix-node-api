import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileTypesEntity } from '@/features/users/profiles/domain/entities/profile-types.entity';
import { ProfileEntity } from '@/features/users/profiles/domain/entities/profile.entity';
import { UserEntity } from '@/features/users/user/domain/entities/user.entity';
import { AdminUserEntity } from '@/features/users/admin-user/domain/entities/admin-user.entity';
import { AdminUserController } from '@/features/users/admin-user/presentation/controllers/admin-user.controller';
import { adminUserProvider } from '@/features/users/admin-user/modules/admin-user.provider';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfileTypesEntity,
      ProfileEntity,
      UserEntity,
      AdminUserEntity,
    ]),
  ],
  controllers: [AdminUserController],
  providers: [...adminUserProvider.register()],
})
export class AdminUserModule {}
