import { ProvidersType } from '@/shared/types/provider.type';
import { AdminUserRepository } from '@/features/users/admin-user/domain/repositories/admin-user.repository';
import { AdminUserListService } from '@/features/users/admin-user/presentation/services/admin-user-list.service';
import { createServiceProvider } from '@/features/base/modules/service.provider';
import { AdminUserListByIdService } from '@/features/users/admin-user/presentation/services/admin-user-list-by-id.service';
import { AdminUserCreateService } from '@/features/users/admin-user/presentation/services/admin-user-create.service';
import { AdminUserUpdateService } from '@/features/users/admin-user/presentation/services/admin-user-update.service';
import { AdminUserListByIdUseCase } from '@/features/users/admin-user/application/use-cases/admin-user-list-by-id.use-case';
import { AdminUserCreateUseCase } from '@/features/users/admin-user/application/use-cases/admin-user-create.use-case';
import { Provider } from '@nestjs/common';

export const adminUserProvider: ProvidersType = {
  repositoryProviders: [
    AdminUserRepository,
    {
      provide: 'IAdminUserRepository',
      useExisting: AdminUserRepository,
    },
  ],

  serviceProviders: [
    AdminUserListService,
    createServiceProvider('IAdminUserListService', AdminUserListService),

    AdminUserListByIdService,
    createServiceProvider(
      'IAdminUserListByIdService',
      AdminUserListByIdService,
    ),

    AdminUserCreateService,
    createServiceProvider('IAdminUserCreateService', AdminUserCreateService),

    AdminUserUpdateService,
    createServiceProvider('IAdminUserUpdateService', AdminUserUpdateService),
  ],

  useCaseProviders: [
    AdminUserListByIdUseCase,
    {
      provide: 'IAdminUserListByIdUseCase',
      useExisting: AdminUserListByIdUseCase,
    },

    AdminUserCreateUseCase,
    {
      provide: 'IAdminUserCreateUseCase',
      useExisting: AdminUserCreateUseCase,
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
    return [];
  },
};
