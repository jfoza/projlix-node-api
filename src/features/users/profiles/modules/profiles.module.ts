import { forwardRef, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from '@/features/users/profiles/domain/entities/profile.entity';
import { ProfileTypesEntity } from '@/features/users/profiles/domain/entities/profile-types.entity';
import { UserEntity } from '@/features/users/user/domain/entities/user.entity';
import { RuleModule } from '@/features/users/rule/modules/rule.module';
import { profileProviders } from '@/features/users/profiles/modules/profile.providers';
import { ProfileController } from '@/features/users/profiles/presentation/controllers/profile.controller';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileEntity, ProfileTypesEntity, UserEntity]),
    forwardRef(() => RuleModule),
  ],
  controllers: [ProfileController],
  providers: [...profileProviders.register()],
  exports: [...profileProviders.exports()],
})
export class ProfileModule {}
