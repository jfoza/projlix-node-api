import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../domain/entities/user.entity';
import { AdminUserEntity } from '../../admin-user/domain/entities/admin-user.entity';
import { ProfileEntity } from '@/users/profiles/domain/entities/profile.entity';
import { userProvider } from '@/users/user/modules/user.provider';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileEntity, UserEntity, AdminUserEntity]),
  ],
  controllers: [],
  providers: [...userProvider.register()],
  exports: [...userProvider.exports()],
})
export class UserModule {}
