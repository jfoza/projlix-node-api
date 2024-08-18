import { ProvidersType } from '@/common/types/provider.type';
import { Provider } from '@nestjs/common';
import { ProjectRepository } from '@/features/projects/project/domain/repositories/project.repository';
import { ProjectListService } from '@/features/projects/project/presentation/services/project-list.service';
import { createServiceProvider } from '@/common/modules/service.provider';
import { ProjectListByIdService } from '@/features/projects/project/presentation/services/project-list-by-id.service';
import { ProjectCreateService } from '@/features/projects/project/presentation/services/project-create.service';
import { ProjectAddTagService } from '@/features/projects/project/presentation/services/project-add-tag.service';
import { ProjectAddTeamUserService } from '@/features/projects/project/presentation/services/project-add-team-user.service';
import { ProjectIconUpdateService } from '@/features/projects/project/presentation/services/project-icon-update.service';
import { ProjectInfoUpdateService } from '@/features/projects/project/presentation/services/project-info-update.service';
import { ProjectRemoveService } from '@/features/projects/project/presentation/services/project-remove.service';
import { ProjectTagRemoveService } from '@/features/projects/project/presentation/services/project-tag-remove.service';
import { ProjectTeamUserRemoveService } from '@/features/projects/project/presentation/services/project-team-user-remove.service';
import { ProjectListByIdUseCase } from '@/features/projects/project/application/use-cases/project-list-by-id.use-case';

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

    ProjectCreateService,
    createServiceProvider('IProjectCreateService', ProjectCreateService),

    ProjectAddTagService,
    createServiceProvider('IProjectAddTagService', ProjectAddTagService),

    ProjectAddTeamUserService,
    createServiceProvider(
      'IProjectAddTeamUserService',
      ProjectAddTeamUserService,
    ),

    ProjectIconUpdateService,
    createServiceProvider(
      'IProjectIconUpdateService',
      ProjectIconUpdateService,
    ),

    ProjectInfoUpdateService,
    createServiceProvider(
      'IProjectInfoUpdateService',
      ProjectInfoUpdateService,
    ),

    ProjectRemoveService,
    createServiceProvider('IProjectRemoveService', ProjectRemoveService),

    ProjectTagRemoveService,
    createServiceProvider('IProjectTagRemoveService', ProjectTagRemoveService),

    ProjectTeamUserRemoveService,
    createServiceProvider(
      'IProjectTeamUserRemoveService',
      ProjectTeamUserRemoveService,
    ),
  ],

  useCaseProviders: [
    ProjectListByIdUseCase,
    {
      provide: 'IProjectListByIdUseCase',
      useExisting: ProjectListByIdUseCase,
    },
  ],

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
