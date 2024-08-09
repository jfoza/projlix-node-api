import {
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@/features/auth/config/auth.guard';
import { IIconListService } from '@/features/general/icons/interfaces/services/icon-list.service.interface';
import { IIconListByIdService } from '@/features/general/icons/interfaces/services/icon-list-by-id.service.interface';
import { IIconEntity } from '@/features/general/icons/interfaces/entities/icon.entity.interface';

@UseGuards(AuthGuard)
@Controller('icons')
export class IconController {
  @Inject('IIconListService')
  private readonly iconListService: IIconListService;

  @Inject('IIconListByIdService')
  private readonly iconListByIdService: IIconListByIdService;

  @Get()
  async findAll(): Promise<IIconEntity[]> {
    return await this.iconListService.handle();
  }

  @Get(':id')
  findById(@Param('id', new ParseUUIDPipe()) id: string): Promise<IIconEntity> {
    return this.iconListByIdService.handle(id);
  }
}
