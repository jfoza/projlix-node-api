import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorEntity } from '@/features/general/colors/domain/entities/color.entity';
import { colorProviders } from '@/features/general/colors/modules/color.providers';
import { ColorController } from '@/features/general/colors/presentation/controllers/color.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ColorEntity])],
  controllers: [ColorController],
  providers: [...colorProviders.register()],
  exports: [...colorProviders.exports()],
})
export class ColorsModule {}
