import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/features/auth/config/auth.guard';
import { IProfileListService } from '@/features/users/profiles/interfaces/services/profile-list.service.interface';
import { ProfileFiltersDto } from '@/features/users/profiles/presentation/dto/profile-filters.dto';
import { IProfileEntity } from '@/features/users/profiles/interfaces/entities/profile.entity.interface';

@UseGuards(AuthGuard)
@Controller('profiles')
export class ProfileController {
  @Inject('IProfileListService')
  private readonly profileListService: IProfileListService;

  @Get()
  async findAll(
    @Query() profileFiltersDto: ProfileFiltersDto,
  ): Promise<IProfileEntity[]> {
    return await this.profileListService.handle(profileFiltersDto);
  }
}
