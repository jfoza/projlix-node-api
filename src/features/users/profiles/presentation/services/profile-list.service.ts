import { ProfileFiltersDto } from '@/features/users/profiles/presentation/dto/profile-filters.dto';
import { Service } from '@/common/presentation/services/service';
import { RulesEnum } from '@/common/enums/rules.enum';
import { Inject, Injectable } from '@nestjs/common';
import { IProfileRepository } from '@/features/users/profiles/interfaces/repositories/profile.repository.interface';
import { IProfileEntity } from '@/features/users/profiles/interfaces/entities/profile.entity.interface';
import { ProfileUniqueNameEnum } from '@/common/enums/profile-unique-name.enum';
import { IProfileListService } from '@/features/users/profiles/interfaces/services/profile-list.service.interface';

@Injectable()
export class ProfileListService extends Service implements IProfileListService {
  private profileFiltersDto: ProfileFiltersDto;

  @Inject('IProfileRepository')
  private readonly profileRepository: IProfileRepository;

  handle(profileFiltersDto: ProfileFiltersDto): Promise<IProfileEntity[]> {
    this.profileFiltersDto = profileFiltersDto;

    const policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.PROFILES_ADMIN_MASTER_VIEW):
        return this.findByAdminMaster();

      case policy.haveRule(RulesEnum.PROFILES_PROJECT_MANAGER_VIEW):
        return this.findByProjectManager();

      case policy.haveRule(RulesEnum.PROFILES_TEAM_LEADER_VIEW):
        return this.findByTeamLeader();

      case policy.haveRule(RulesEnum.PROFILES_PROJECT_MEMBER_VIEW):
        return this.findByProjectMember();
    }
  }

  private async findByAdminMaster(): Promise<IProfileEntity[]> {
    this.profileFiltersDto.uniqueName =
      ProfileUniqueNameEnum.PROFILES_BY_ADMIN_MASTER;

    return this.profileRepository.findAll(this.profileFiltersDto);
  }

  private async findByProjectManager(): Promise<IProfileEntity[]> {
    this.profileFiltersDto.uniqueName =
      ProfileUniqueNameEnum.PROFILES_BY_PROJECT_MANAGER;

    return this.profileRepository.findAll(this.profileFiltersDto);
  }

  private async findByTeamLeader(): Promise<IProfileEntity[]> {
    this.profileFiltersDto.uniqueName =
      ProfileUniqueNameEnum.PROFILES_BY_TEAM_LEADER;

    return this.profileRepository.findAll(this.profileFiltersDto);
  }

  private async findByProjectMember(): Promise<IProfileEntity[]> {
    this.profileFiltersDto.uniqueName =
      ProfileUniqueNameEnum.PROFILES_BY_PROJECT_MEMBER;

    return this.profileRepository.findAll(this.profileFiltersDto);
  }
}
