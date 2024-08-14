import { IProjectListService } from '@/features/projects/project/interfaces/services/project-list.service.interface';
import { ProjectFiltersDto } from '@/features/projects/project/presentation/dto/project-filters.dto';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { Policy } from '@/acl/types/policy';
import { RulesEnum } from '@/common/enums/rules.enum';

@Injectable()
export class ProjectListService extends Service implements IProjectListService {
  @Inject('IProjectRepository')
  private readonly projectRepository: IProjectRepository;

  private projectFiltersDto: ProjectFiltersDto;

  async handle(
    projectFiltersDto: ProjectFiltersDto,
  ): Promise<IProjectEntity[] | ILengthAwarePaginator> {
    this.projectFiltersDto = projectFiltersDto;

    const policy: Policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.PROJECTS_ADMIN_MASTER_VIEW):
        return await this.findByAdminMaster();

      case policy.haveRule(RulesEnum.PROJECTS_PROJECT_MANAGER_VIEW) ||
        policy.haveRule(RulesEnum.PROJECTS_TEAM_LEADER_VIEW) ||
        policy.haveRule(RulesEnum.PROJECTS_PROJECT_MEMBER_VIEW):
        return this.findByAccess();

      default:
        policy.policyException();
    }
  }

  private async findByAdminMaster(): Promise<
    IProjectEntity[] | ILengthAwarePaginator
  > {
    return await this.projectRepository.findAll(this.projectFiltersDto);
  }

  private async findByAccess(): Promise<
    IProjectEntity[] | ILengthAwarePaginator
  > {
    this.projectFiltersDto.projectsId = await this.getTeamUserProjectsId();

    return await this.projectRepository.findAll(this.projectFiltersDto);
  }
}
