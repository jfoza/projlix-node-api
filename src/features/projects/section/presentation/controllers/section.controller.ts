import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@/features/auth/config/auth.guard';
import { ISectionListService } from '@/features/projects/section/interfaces/services/section-list.service.interface';
import { SectionFiltersDto } from '@/features/projects/section/presentation/dto/section-filters.dto';
import { ISectionEntity } from '@/features/projects/section/interfaces/entities/section.entity.interface';
import { ISectionListByIdService } from '@/features/projects/section/interfaces/services/section-list-by-id.service.interface';
import { CreateSectionDto } from '@/features/projects/section/presentation/dto/create-section.dto';
import { ISectionCreateService } from '@/features/projects/section/interfaces/services/section-create.service.interface';
import { UpdateSectionDto } from '@/features/projects/section/presentation/dto/update-section.dto';
import { ISectionUpdateService } from '@/features/projects/section/interfaces/services/section-update.service.interface';
import { ISectionRemoveService } from '@/features/projects/section/interfaces/services/section-remove.service.interface';
import { SectionReorderDto } from '@/features/projects/section/presentation/dto/section-reorder.dto';
import { ISectionReorderService } from '@/features/projects/section/interfaces/services/section-reorder.service.interface';

@UseGuards(AuthGuard)
@Controller('sections')
export class SectionController {
  @Inject('ISectionListService')
  private readonly sectionListService: ISectionListService;

  @Inject('ISectionListByIdService')
  private readonly sectionListByIdService: ISectionListByIdService;

  @Inject('ISectionCreateService')
  private readonly sectionCreateService: ISectionCreateService;

  @Inject('ISectionUpdateService')
  private readonly sectionUpdateService: ISectionUpdateService;

  @Inject('ISectionReorderService')
  private readonly sectionReorderService: ISectionReorderService;

  @Inject('ISectionRemoveService')
  private readonly sectionRemoveService: ISectionRemoveService;

  @Get()
  async findAll(
    @Query() sectionFiltersDto: SectionFiltersDto,
  ): Promise<ISectionEntity[]> {
    return await this.sectionListService.handle(sectionFiltersDto);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ISectionEntity> {
    return await this.sectionListByIdService.handle(id);
  }

  @Post()
  async create(
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<ISectionEntity> {
    return await this.sectionCreateService.handle(createSectionDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ): Promise<ISectionEntity> {
    return await this.sectionUpdateService.handle(id, updateSectionDto);
  }

  @Put(':id/reorder')
  async reorder(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() sectionReorderDto: SectionReorderDto,
  ): Promise<void> {
    return await this.sectionReorderService.handle(id, sectionReorderDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return await this.sectionRemoveService.handle(id);
  }
}
