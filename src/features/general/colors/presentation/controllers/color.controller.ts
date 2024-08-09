import {
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@/features/auth/config/auth.guard';
import { IColorListService } from '@/features/general/colors/interfaces/services/color-list.service.interface';
import { IColorListByIdService } from '@/features/general/colors/interfaces/services/color-list-by-id.service.interface';
import { IColorEntity } from '@/features/general/colors/interfaces/entities/color.entity.interface';

@UseGuards(AuthGuard)
@Controller('colors')
export class ColorController {
  @Inject('IColorListService')
  private readonly colorListService: IColorListService;

  @Inject('IColorListByIdService')
  private readonly colorListByIdService: IColorListByIdService;

  @Get()
  async findAll(): Promise<IColorEntity[]> {
    return await this.colorListService.handle();
  }

  @Get(':id')
  findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<IColorEntity> {
    return this.colorListByIdService.handle(id);
  }
}
