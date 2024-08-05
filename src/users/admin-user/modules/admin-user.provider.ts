import { ProvidersType } from '@/shared/types/provider.type';
import { AdminUserRepository } from '@/users/admin-user/domain/repositories/admin-user.repository';
import { AdminUserListService } from '@/users/admin-user/presentation/services/admin-user-list.service';
import { AdminUserListByIdService } from '@/users/admin-user/presentation/services/admin-user-list-by-id.service';
import { AdminUserCreateService } from '@/users/admin-user/presentation/services/admin-user-create.service';
import { AdminUserListByIdUseCase } from '@/users/admin-user/application/use-cases/admin-user-list-by-id.use-case';
import { AdminUserCreateUseCase } from '@/users/admin-user/application/use-cases/admin-user-create.use-case';
import { Provider } from '@nestjs/common';
import { AdminUserUpdateService } from '@/users/admin-user/presentation/services/admin-user-update.service';

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
    {
      provide: 'IAdminUserListService',
      useExisting: AdminUserListService,
    },
    AdminUserListByIdService,
    {
      provide: 'IAdminUserListByIdService',
      useExisting: AdminUserListByIdService,
    },
    AdminUserCreateService,
    {
      provide: 'IAdminUserCreateService',
      useExisting: AdminUserCreateService,
    },
    AdminUserUpdateService,
    {
      provide: 'IAdminUserUpdateService',
      useExisting: AdminUserUpdateService,
    },
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
