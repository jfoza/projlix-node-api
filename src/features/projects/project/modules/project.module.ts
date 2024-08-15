import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '@/features/projects/project/domain/entities/project.entity';
import { IconEntity } from '@/features/general/icons/domain/entities/icon.entity';
import { TagEntity } from '@/features/general/tags/domain/entities/tag.entity';
import { projectProviders } from '@/features/projects/project/modules/project.providers';
import { ProjectListController } from '@/features/projects/project/presentation/controllers/project-list.controller';
import { IconsModule } from '@/features/general/icons/modules/icons.module';
import { TeamUserModule } from '@/features/users/team-user/modules/team-user.module';
import { ProjectCreateController } from '@/features/projects/project/presentation/controllers/project-create.controller';
import { ProjectUpdateController } from '@/features/projects/project/presentation/controllers/project-update.controller';
import { ProjectRemoveController } from '@/features/projects/project/presentation/controllers/project-remove.controller';
import { TagsModule } from '@/features/general/tags/modules/tags.module';
import { ProjectTeamUserDto } from '@/features/projects/project/presentation/dto/project-team-user.dto';
import { ProjectTagDto } from '@/features/projects/project/presentation/dto/project-tag.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, IconEntity, TagEntity]),
    IconsModule,
    forwardRef(() => TeamUserModule),
    forwardRef(() => TagsModule),
  ],
  providers: [
    ...projectProviders.register(),
    ProjectTeamUserDto,
    ProjectTagDto,
  ],
  controllers: [
    ProjectListController,
    ProjectCreateController,
    ProjectUpdateController,
    ProjectRemoveController,
  ],
  exports: [...projectProviders.exports()],
})
export class ProjectModule {}
