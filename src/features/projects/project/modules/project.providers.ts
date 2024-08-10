import { ProvidersType } from '@/common/types/provider.type';
import { Provider } from '@nestjs/common';
import { ProjectRepository } from '@/features/projects/project/domain/repositories/project.repository';
import { ProjectListService } from '@/features/projects/project/presentation/services/project-list.service';
import { createServiceProvider } from '@/common/modules/service.provider';
import { ProjectListByIdService } from '@/features/projects/project/presentation/services/project-list-by-id.service';

export const projectProviders: ProvidersType = {
  repositoryProviders: [
    ProjectRepository,
    {
      provide: 'IProjectRepository',
      useExisting: ProjectRepository,
    },
  ],

  serviceProviders: [
    ProjectListService,
    createServiceProvider('IProjectListService', ProjectListService),

    ProjectListByIdService,
    createServiceProvider('IProjectListByIdService', ProjectListByIdService),
  ],

  useCaseProviders: [],

  exports(): string[] {
    return ['IProjectRepository'];
  },

  register(): Provider[] {
    return [
      ...this.repositoryProviders,
      ...this.serviceProviders,
      ...this.useCaseProviders,
    ];
  },
};
