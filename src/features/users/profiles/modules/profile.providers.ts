import { Provider } from '@nestjs/common';
import { ProfileRepository } from '@/features/users/profiles/domain/repositories/profile.repository';
import { ProvidersType } from '@/common/types/provider.type';
import { ProfileListService } from '@/features/users/profiles/presentation/services/profile-list.service';
import { createServiceProvider } from '@/common/modules/service.provider';

export const profileProviders: ProvidersType = {
  repositoryProviders: [
    ProfileRepository,
    {
      provide: 'IProfileRepository',
      useExisting: ProfileRepository,
    },
  ],
  serviceProviders: [
    ProfileListService,
    createServiceProvider('IProfileListService', ProfileListService),
  ],
  useCaseProviders: [],
  register(): Provider[] {
    return [
      ...this.repositoryProviders,
      ...this.serviceProviders,
      ...this.useCaseProviders,
    ];
  },
  exports(): string[] {
    return ['IProfileRepository'];
  },
};
