import { ProvidersType } from '@/shared/types/provider.type';
import { Provider } from '@nestjs/common';
import { ProfileRepository } from '@/features/users/profiles/domain/repositories/profile.repository';

export const profileProviders: ProvidersType = {
  repositoryProviders: [
    ProfileRepository,
    {
      provide: 'IProfileRepository',
      useExisting: ProfileRepository,
    },
  ],
  serviceProviders: [],
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
