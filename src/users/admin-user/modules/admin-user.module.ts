import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/users/user/domain/entities/user.entity';
import { AdminUserEntity } from '@/users/admin-user/domain/entities/admin-user.entity';
import { AdminUserController } from '@/users/admin-user/presentation/controllers/admin-user.controller';
import { ProfileEntity } from '@/users/profiles/domain/entities/profile.entity';
import { ProfileTypesEntity } from '@/users/profiles/domain/entities/profile-types.entity';
import { UserModule } from '@/users/user/modules/user.module';
import { adminUserProvider } from '@/users/admin-user/modules/admin-user.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfileTypesEntity,
      ProfileEntity,
      UserEntity,
      AdminUserEntity,
    ]),
    UserModule,
  ],
  controllers: [AdminUserController],
  providers: [...adminUserProvider.register()],
})
export class AdminUserModule {}
