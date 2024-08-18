import { ProvidersType } from '@/common/types/provider.type';
import { Provider } from '@nestjs/common';
import { TagRepository } from '@/features/general/tags/domain/repositories/tag.repository';
import { TagListService } from '@/features/general/tags/presentation/services/tag-list.service';
import { createServiceProvider } from '@/common/modules/service.provider';
import { TagListByIdService } from '@/features/general/tags/presentation/services/tag-list-by-id.service';
import { TagCreateService } from '@/features/general/tags/presentation/services/tag-create.service';
import { TagUpdateService } from '@/features/general/tags/presentation/services/tag-update.service';
import { TagRemoveService } from '@/features/general/tags/presentation/services/tag-remove.service';
import { TagUpdateStatusService } from '@/features/general/tags/presentation/services/tag-update-status.service';

export const tagProviders: ProvidersType = {
  repositoryProviders: [
    TagRepository,
    {
      provide: 'ITagRepository',
      useExisting: TagRepository,
    },
  ],
  serviceProviders: [
    TagListService,
    createServiceProvider('ITagListService', TagListService),

    TagListByIdService,
    createServiceProvider('ITagListByIdService', TagListByIdService),

    TagCreateService,
    createServiceProvider('ITagCreateService', TagCreateService),

    TagUpdateService,
    createServiceProvider('ITagUpdateService', TagUpdateService),

    TagUpdateStatusService,
    createServiceProvider('ITagUpdateStatusService', TagUpdateStatusService),

    TagRemoveService,
    createServiceProvider('ITagRemoveService', TagRemoveService),
  ],
  useCaseProviders: [],
  exports(): string[] {
    return ['ITagRepository'];
  },
  register(): Provider[] {
    return [
      ...this.repositoryProviders,
      ...this.serviceProviders,
      ...this.useCaseProviders,
    ];
  },
};
