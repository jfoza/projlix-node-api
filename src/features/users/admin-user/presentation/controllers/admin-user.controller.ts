import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@/features/auth/config/auth.guard';
import { IAdminUserListService } from '@/features/users/admin-user/interfaces/services/admin-user-list.service.interface';
import { IAdminUserListByIdService } from '@/features/users/admin-user/interfaces/services/admin-user-list-by-id.service.interface';
import { IAdminUserCreateService } from '@/features/users/admin-user/interfaces/services/admin-user-create.service.interface';
import { IAdminUserUpdateService } from '@/features/users/admin-user/interfaces/services/admin-user-update.service.interface';
import { CreateAdminUserDto } from '@/features/users/admin-user/presentation/dto/create-admin-user.dto';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { UpdateAdminUserDto } from '@/features/users/admin-user/presentation/dto/update-admin-user.dto';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { AdminUserFiltersDto } from '@/features/users/admin-user/presentation/dto/admin-user-filters.dto';

@UseGuards(AuthGuard)
@Controller('admin-users')
export class AdminUserController {
  @Inject('IAdminUserListService')
  private readonly adminUserListService: IAdminUserListService;

  @Inject('IAdminUserListByIdService')
  private readonly adminUserListByIdService: IAdminUserListByIdService;

  @Inject('IAdminUserCreateService')
  private readonly adminUserCreateService: IAdminUserCreateService;

  @Inject('IAdminUserUpdateService')
  private readonly adminUserUpdateService: IAdminUserUpdateService;

  @Post()
  async create(
    @Body() createAdminUserDto: CreateAdminUserDto,
  ): Promise<IUserEntity> {
    return await this.adminUserCreateService.handle(createAdminUserDto);
  }

  @Get()
  async findAll(
    @Query() adminUserFiltersDto: AdminUserFiltersDto,
  ): Promise<ILengthAwarePaginator> {
    return await this.adminUserListService.handle(adminUserFiltersDto);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<IUserEntity> {
    return await this.adminUserListByIdService.handle(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAdminUserDto: UpdateAdminUserDto,
  ): Promise<IUserEntity> {
    return await this.adminUserUpdateService.handle(id, updateAdminUserDto);
  }
}
