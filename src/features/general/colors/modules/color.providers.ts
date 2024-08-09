import { ProvidersType } from '@/common/types/provider.type';
import { Provider } from '@nestjs/common';
import { ColorRepository } from '@/features/general/colors/domain/repositories/color.repository';
import { ColorListService } from '@/features/general/colors/presentation/services/color-list.service';
import { ColorListByIdService } from '@/features/general/colors/presentation/services/color-list-by-id.service';
import { createServiceProvider } from '@/common/modules/service.provider';

export const colorProviders: ProvidersType = {
  repositoryProviders: [
    ColorRepository,
    {
      provide: 'IColorRepository',
      useExisting: ColorRepository,
    },
  ],

  serviceProviders: [
    ColorListService,
    createServiceProvider('IColorListService', ColorListService),

    ColorListByIdService,
    createServiceProvider('IColorListByIdService', ColorListByIdService),
  ],

  useCaseProviders: [],

  exports(): string[] {
    return ['IColorRepository'];
  },

  register(): Provider[] {
    return [
      ...this.repositoryProviders,
      ...this.serviceProviders,
      ...this.useCaseProviders,
    ];
  },
};
