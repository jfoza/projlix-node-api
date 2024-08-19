import { ProvidersType } from '@/common/types/provider.type';
import { Provider } from '@nestjs/common';
import { TeamUserRepository } from '@/features/users/team-user/domain/repositories/team-user.repository';
import { createServiceProvider } from '@/common/modules/service.provider';
import { TeamUserListService } from '@/features/users/team-user/presentation/services/team-user-list.service';
import { TeamUserListByIdService } from '@/features/users/team-user/presentation/services/team-user-list-by-id.service';
import { TeamUserListByProfileUseCase } from '@/features/users/team-user/application/use-cases/team-user-list-by-profile.use-case';
import { TeamUserCreateService } from '@/features/users/team-user/presentation/services/team-user-create.service';
import { TeamUserUpdateService } from '@/features/users/team-user/presentation/services/team-user-update.service';
import { TeamUserUpdateStatusService } from '@/features/users/team-user/presentation/services/team-user-update-status.service';

export const teamUserProviders: ProvidersType = {
  repositoryProviders: [
    TeamUserRepository,
    {
      provide: 'ITeamUserRepository',
      useExisting: TeamUserRepository,
    },
  ],

  serviceProviders: [
    TeamUserListService,
    createServiceProvider('ITeamUserListService', TeamUserListService),

    TeamUserListByIdService,
    createServiceProvider('ITeamUserListByIdService', TeamUserListByIdService),

    TeamUserCreateService,
    createServiceProvider('ITeamUserCreateService', TeamUserCreateService),

    TeamUserUpdateService,
    createServiceProvider('ITeamUserUpdateService', TeamUserUpdateService),

    TeamUserUpdateStatusService,
    createServiceProvider(
      'ITeamUserUpdateStatusService',
      TeamUserUpdateStatusService,
    ),
  ],

  useCaseProviders: [
    TeamUserListByProfileUseCase,
    createServiceProvider(
      'ITeamUserListByProfileUseCase',
      TeamUserListByProfileUseCase,
    ),
  ],

  exports(): string[] {
    return ['ITeamUserRepository'];
  },

  register(): Provider[] {
    return [
      ...this.repositoryProviders,
      ...this.serviceProviders,
      ...this.useCaseProviders,
    ];
  },
};
