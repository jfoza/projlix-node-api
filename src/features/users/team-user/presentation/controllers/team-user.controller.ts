import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ITeamUserListService } from '@/features/users/team-user/interfaces/services/team-user-list.service.interface';
import { ITeamUserListByIdService } from '@/features/users/team-user/interfaces/services/team-user-list-by-id.service.interface';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { TeamUserFiltersDto } from '@/features/users/team-user/presentation/dto/team-user-filters.dto';
import { AuthGuard } from '@/features/auth/config/auth.guard';
import { CreateTeamUserDto } from '@/features/users/team-user/presentation/dto/create-team-user.dto';
import { UpdateTeamUserDto } from '@/features/users/team-user/presentation/dto/update-team-user.dto';
import { ITeamUserCreateService } from '@/features/users/team-user/interfaces/services/team-user-create.service.interface';
import { ITeamUserUpdateService } from '@/features/users/team-user/interfaces/services/team-user-update.service.interface';
import { ITeamUserUpdateStatusService } from '@/features/users/team-user/interfaces/services/team-user-update-status.service.interface';
import { IUserUpdateStatus } from '@/features/users/admin-user/interfaces/responses/user-update-status.interface';

@UseGuards(AuthGuard)
@Controller('team-users')
export class TeamUserController {
  @Inject('ITeamUserListService')
  private readonly teamUserListService: ITeamUserListService;

  @Inject('ITeamUserListByIdService')
  private readonly teamUserListByIdService: ITeamUserListByIdService;

  @Inject('ITeamUserCreateService')
  private readonly teamUserCreateService: ITeamUserCreateService;

  @Inject('ITeamUserUpdateService')
  private readonly teamUserUpdateService: ITeamUserUpdateService;

  @Inject('ITeamUserUpdateStatusService')
  private readonly teamUserUpdateStatusService: ITeamUserUpdateStatusService;

  @Get()
  async findAll(
    @Query() teamUserFiltersDto: TeamUserFiltersDto,
  ): Promise<ILengthAwarePaginator> {
    return await this.teamUserListService.handle(teamUserFiltersDto);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<IUserEntity> {
    return await this.teamUserListByIdService.handle(id);
  }

  @Post()
  async create(
    @Body() createTeamUserDto: CreateTeamUserDto,
  ): Promise<IUserEntity> {
    return await this.teamUserCreateService.handle(createTeamUserDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTeamUserDto: UpdateTeamUserDto,
  ): Promise<IUserEntity> {
    return await this.teamUserUpdateService.handle(id, updateTeamUserDto);
  }

  @Put('status/:id')
  async updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<IUserUpdateStatus> {
    return await this.teamUserUpdateStatusService.handle(id);
  }
}
