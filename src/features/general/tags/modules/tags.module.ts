import { forwardRef, Module } from '@nestjs/common';
import { tagProviders } from '@/features/general/tags/modules/tag.providers';
import { TagController } from '@/features/general/tags/presentation/controllers/tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from '@/features/general/tags/domain/entities/tag.entity';
import { ColorEntity } from '@/features/general/colors/domain/entities/color.entity';
import { ColorsModule } from '@/features/general/colors/modules/colors.module';
import { ProjectModule } from '@/features/projects/project/modules/project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TagEntity, ColorEntity]),
    forwardRef(() => ProjectModule),
    ColorsModule,
  ],
  providers: [...tagProviders.register()],
  controllers: [TagController],
  exports: [...tagProviders.exports()],
})
export class TagsModule {}
