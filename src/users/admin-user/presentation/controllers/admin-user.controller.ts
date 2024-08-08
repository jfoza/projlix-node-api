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
import { IAdminUserListService } from '@/users/admin-user/interfaces/services/admin-user-list.service.interface';
import { IUserEntity } from '@/users/user/interfaces/entities/user-entity.interface';
import { IAdminUserListByIdService } from '@/users/admin-user/interfaces/services/admin-user-list-by-id.service.interface';
import { CreateAdminUserDto } from '@/users/admin-user/presentation/dto/create-admin-user.dto';
import { IAdminUserCreateService } from '@/users/admin-user/interfaces/services/admin-user-create.service.interface';
import { IAdminUserUpdateService } from '@/users/admin-user/interfaces/services/admin-user-update.service.interface';
import { UpdateAdminUserDto } from '@/users/admin-user/presentation/dto/update-admin-user.dto';
import { AuthGuard } from '@/auth/config/auth.guard';

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
