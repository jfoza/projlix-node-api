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
} from '@nestjs/common';
import { AuthGuard } from '@/features/auth/config/auth.guard';
import { IAdminUserListService } from '@/features/users/admin-user/interfaces/services/admin-user-list.service.interface';
import { IAdminUserListByIdService } from '@/features/users/admin-user/interfaces/services/admin-user-list-by-id.service.interface';
import { IAdminUserCreateService } from '@/features/users/admin-user/interfaces/services/admin-user-create.service.interface';
import { IAdminUserUpdateService } from '@/features/users/admin-user/interfaces/services/admin-user-update.service.interface';
import { CreateAdminUserDto } from '@/features/users/admin-user/presentation/dto/create-admin-user.dto';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { UpdateAdminUserDto } from '@/features/users/admin-user/presentation/dto/update-admin-user.dto';

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
  async findAll(): Promise<IUserEntity[]> {
    return await this.adminUserListService.handle();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<IUserEntity> {
    return this.adminUserListByIdService.handle(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminUserDto: UpdateAdminUserDto,
  ): Promise<IUserEntity> {
    return this.adminUserUpdateService.handle(id, updateAdminUserDto);
  }
}
