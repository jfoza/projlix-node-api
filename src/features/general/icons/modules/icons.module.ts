import { Module } from '@nestjs/common';
import { iconProviders } from '@/features/general/icons/modules/icon.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IconEntity } from '@/features/general/icons/domain/entities/icon.entity';
import { IconController } from '@/features/general/icons/presentation/controllers/icon.controller';

@Module({
  imports: [TypeOrmModule.forFeature([IconEntity])],
  providers: [...iconProviders.register()],
  controllers: [IconController],
  exports: [...iconProviders.exports()],
})
export class IconsModule {}
