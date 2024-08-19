import { ProvidersType } from '@/common/types/provider.type';
import { Provider } from '@nestjs/common';
import { SectionRepository } from '@/features/projects/section/domain/repositories/section.repository';
import { SectionListService } from '@/features/projects/section/presentation/services/section-list.service';
import { createServiceProvider } from '@/common/modules/service.provider';
import { ServiceListByIdService } from '@/features/projects/section/presentation/services/service-list-by-id.service';
import { SectionCreateService } from '@/features/projects/section/presentation/services/section-create.service';
import { SectionUpdateService } from '@/features/projects/section/presentation/services/section-update.service';
import { SectionRemoveService } from '@/features/projects/section/presentation/services/section-remove.service';
import { SectionReorderService } from '@/features/projects/section/presentation/services/section-reorder.service';

export const sectionProviders: ProvidersType = {
  repositoryProviders: [
    SectionRepository,
    {
      provide: 'ISectionRepository',
      useExisting: SectionRepository,
    },
  ],

  serviceProviders: [
    SectionListService,
    createServiceProvider('ISectionListService', SectionListService),

    ServiceListByIdService,
    createServiceProvider('ISectionListByIdService', ServiceListByIdService),

    SectionCreateService,
    createServiceProvider('ISectionCreateService', SectionCreateService),

    SectionUpdateService,
    createServiceProvider('ISectionUpdateService', SectionUpdateService),

    SectionRemoveService,
    createServiceProvider('ISectionRemoveService', SectionRemoveService),

    SectionReorderService,
    createServiceProvider('ISectionReorderService', SectionReorderService),
  ],

  useCaseProviders: [],

  exports(): string[] {
    return ['ISectionRepository'];
  },

  register(): Provider[] {
    return [
      ...this.repositoryProviders,
      ...this.serviceProviders,
      ...this.useCaseProviders,
    ];
  },
};
