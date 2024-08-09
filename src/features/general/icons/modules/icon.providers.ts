import { ProvidersType } from '@/common/types/provider.type';
import { Provider } from '@nestjs/common';
import { IconRepository } from '@/features/general/icons/domain/repositories/icon.repository';
import { IconListService } from '@/features/general/icons/presentation/services/icon-list.service';
import { createServiceProvider } from '@/common/modules/service.provider';
import { IconListByIdService } from '@/features/general/icons/presentation/services/icon-list-by-id.service';

export const iconProviders: ProvidersType = {
  repositoryProviders: [
    IconRepository,
    { provide: 'IIconRepository', useClass: IconRepository },
  ],

  serviceProviders: [
    IconListService,
    createServiceProvider('IIconListService', IconListService),

    IconListByIdService,
    createServiceProvider('IIconListByIdService', IconListByIdService),
  ],

  useCaseProviders: [],

  exports(): string[] {
    return ['IIconRepository'];
  },

  register(): Provider[] {
    return [
      ...this.repositoryProviders,
      ...this.serviceProviders,
      ...this.useCaseProviders,
    ];
  },
};
