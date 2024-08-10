import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '@/features/projects/project/domain/entities/project.entity';
import { IconEntity } from '@/features/general/icons/domain/entities/icon.entity';
import { TagEntity } from '@/features/general/tags/domain/entities/tag.entity';
import { projectProviders } from '@/features/projects/project/modules/project.providers';
import { ProjectController } from '@/features/projects/project/presentation/controllers/project.constroller';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, IconEntity, TagEntity])],
  providers: [...projectProviders.register()],
  controllers: [ProjectController],
  exports: [...projectProviders.exports()],
})
export class ProjectModule {}
