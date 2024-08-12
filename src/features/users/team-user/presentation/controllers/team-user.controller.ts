import {
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ITeamUserListService } from '@/features/users/team-user/interfaces/services/team-user-list.service.interface';
import { ITeamUserListByIdService } from '@/features/users/team-user/interfaces/services/team-user-list-by-id.service.interface';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { TeamUserFiltersDto } from '@/features/users/team-user/presentation/dto/team-user-filters.dto';
import { AuthGuard } from '@/features/auth/config/auth.guard';

@UseGuards(AuthGuard)
@Controller('team-users')
export class TeamUserController {
  @Inject('ITeamUserListService')
  private readonly teamUserListService: ITeamUserListService;

  @Inject('ITeamUserListByIdService')
  private readonly teamUserListByIdService: ITeamUserListByIdService;

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
}
