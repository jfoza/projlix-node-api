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
import { ITagListService } from '@/features/general/tags/interfaces/services/tag-list.service.interface';
import { ITagListByIdService } from '@/features/general/tags/interfaces/services/tag-list-by-id.service.interface';
import { ITagCreateService } from '@/features/general/tags/interfaces/services/tag-create.service.interface';
import { ITagUpdateService } from '@/features/general/tags/interfaces/services/tag-update.service.interface';
import { ITagRemoveService } from '@/features/general/tags/interfaces/services/tag-remove.service.interface';
import { ITagEntity } from '@/features/general/tags/interfaces/entities/tag.entity';
import { CreateTagDto } from '@/features/general/tags/presentation/dto/create-tag.dto';
import { UpdateTagDto } from '@/features/general/tags/presentation/dto/update-tag.dto';
import { TagFiltersDto } from '@/features/general/tags/presentation/dto/tag-filters.dto';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { ITagUpdateStatusService } from '@/features/general/tags/interfaces/services/tag-update-status.service.interface';
import { ITagUpdateStatus } from '@/features/general/tags/interfaces/responses/tag-update-status.interface';

@UseGuards(AuthGuard)
@Controller('tags')
export class TagController {
  @Inject('ITagListService')
  private readonly tagListService: ITagListService;

  @Inject('ITagListByIdService')
  private readonly tagListByIdService: ITagListByIdService;

  @Inject('ITagCreateService')
  private readonly tagCreateService: ITagCreateService;

  @Inject('ITagUpdateStatusService')
  private readonly tagUpdateStatusService: ITagUpdateStatusService;

  @Inject('ITagUpdateService')
  private readonly tagUpdateService: ITagUpdateService;

  @Inject('ITagRemoveService')
  private readonly tagRemoveService: ITagRemoveService;

  @Get()
  async findAll(
    @Query() tagFiltersDto: TagFiltersDto,
  ): Promise<ITagEntity[] | ILengthAwarePaginator> {
    return await this.tagListService.handle(tagFiltersDto);
  }

  @Get(':id')
  async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ITagEntity> {
    return await this.tagListByIdService.handle(id);
  }

  @Post()
  async create(@Body() createTagDto: CreateTagDto): Promise<ITagEntity> {
    return await this.tagCreateService.handle(createTagDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<ITagEntity> {
    return await this.tagUpdateService.handle(id, updateTagDto);
  }

  @Put('status/:id')
  async updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ITagUpdateStatus> {
    return await this.tagUpdateStatusService.handle(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return await this.tagRemoveService.handle(id);
  }
}
