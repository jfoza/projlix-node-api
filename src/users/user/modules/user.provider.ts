import { ProvidersType } from '@/shared/types/provider.type';
import { Provider } from '@nestjs/common';
import { UserRepository } from '@/users/user/domain/repositories/user.repository';
import { UserCreateUseCase } from '@/users/user/application/use-cases/user-create.use-case';
import { UserUpdateStatusUseCase } from '@/users/user/application/use-cases/user-update-status.use-case';
import { UserUpdatePasswordUseCase } from '@/users/user/application/use-cases/user-update-password.use-case';
import { UserUpdateUseCase } from '@/users/user/application/use-cases/user-update.use-case';

export const userProvider: ProvidersType = {
  repositoryProviders: [
    UserRepository,
    {
      provide: 'IUserRepository',
      useExisting: UserRepository,
    },
  ],

  serviceProviders: [],

  useCaseProviders: [
    UserCreateUseCase,
    {
      provide: 'IUserCreateUseCase',
      useExisting: UserCreateUseCase,
    },

    UserUpdateStatusUseCase,
    {
      provide: 'IUserUpdateStatusUseCase',
      useExisting: UserUpdateStatusUseCase,
    },

    UserUpdatePasswordUseCase,
    {
      provide: 'IUserUpdatePasswordUseCase',
      useExisting: UserUpdatePasswordUseCase,
    },

    UserUpdateUseCase,
    {
      provide: 'IUserUpdateUseCase',
      useExisting: UserUpdateUseCase,
    },
  ],

  register(): Provider[] {
    return [
      ...this.repositoryProviders,
      ...this.serviceProviders,
      ...this.useCaseProviders,
    ];
  },

  exports(): string[] {
    return [
      'IUserRepository',
      'IUserCreateUseCase',
      'IUserUpdateStatusUseCase',
      'IUserUpdatePasswordUseCase',
      'IUserUpdateUseCase',
    ];
  },
};
