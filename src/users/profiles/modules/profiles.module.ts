import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from '@/users/profiles/domain/entities/profile.entity';
import { ProfileTypesEntity } from '@/users/profiles/domain/entities/profile-types.entity';
import { UserEntity } from '@/users/user/domain/entities/user.entity';
import { profileProviders } from '@/users/profiles/modules/profile.providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileEntity, ProfileTypesEntity, UserEntity]),
  ],
  providers: [...profileProviders.register()],
  exports: [...profileProviders.exports()],
})
export class ProfileModule {}
