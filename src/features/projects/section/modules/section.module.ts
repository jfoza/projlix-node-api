import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionEntity } from '@/features/projects/section/domain/entities/section.entity';
import { sectionProviders } from '@/features/projects/section/modules/section.providers';
import { SectionController } from '@/features/projects/section/presentation/controllers/section.controller';
import { ProjectModule } from '@/features/projects/project/modules/project.module';
import { IconsModule } from '@/features/general/icons/modules/icons.module';
import { ColorsModule } from '@/features/general/colors/modules/colors.module';
import { SectionReorderRoutine } from '@/features/projects/section/domain/routines/section-reorder.routine';

@Module({
  imports: [
    TypeOrmModule.forFeature([SectionEntity]),
    ProjectModule,
    IconsModule,
    ColorsModule,
  ],
  providers: [...sectionProviders.register(), SectionReorderRoutine],
  exports: [...sectionProviders.exports()],
  controllers: [SectionController],
})
export class SectionModule {}
