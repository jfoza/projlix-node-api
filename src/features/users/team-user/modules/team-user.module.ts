import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamUserEntity } from '@/features/users/team-user/domain/entities/team-user.entity';
import { ProfileEntity } from '@/features/users/profiles/domain/entities/profile.entity';
import { UserEntity } from '@/features/users/user/domain/entities/user.entity';
import { UserModule } from '@/features/users/user/modules/user.module';
import { teamUserProviders } from '@/features/users/team-user/modules/team-user.providers';
import { TeamUserController } from '@/features/users/team-user/presentation/controllers/team-user.controller';
import { ProjectModule } from '@/features/projects/project/modules/project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamUserEntity, ProfileEntity, UserEntity]),
    UserModule,
    ProjectModule,
  ],
  providers: [...teamUserProviders.register()],
  controllers: [TeamUserController],
  exports: [...teamUserProviders.exports()],
})
export class TeamUserModule {}
