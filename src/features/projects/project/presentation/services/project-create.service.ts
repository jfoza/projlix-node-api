import { IProjectCreateService } from '@/features/projects/project/interfaces/services/project-create.service.interface';
import { CreateProjectDto } from '@/features/projects/project/presentation/dto/create-project.dto';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { Policy } from '@/acl/types/policy';
import { RulesEnum } from '@/common/enums/rules.enum';
import { ProjectValidations } from '@/features/projects/project/application/validations/project.validations';
import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { IIconRepository } from '@/features/general/icons/interfaces/repositories/icon.repository.interface';
import { Helper } from '@/common/helpers';
import { ITeamUserRepository } from '@/features/users/team-user/interfaces/repositories/team-user.repository.interface';

@Injectable()
export class ProjectCreateService
  extends Service
  implements IProjectCreateService
{
  private createProjectDto: CreateProjectDto;

  @Inject('IProjectRepository')
  private readonly projectRepository: IProjectRepository;

  @Inject('IIconRepository')
  private readonly iconRepository: IIconRepository;

  @Inject('ITeamUserRepository')
  private readonly teamUserRepository: ITeamUserRepository;

  async handle(createProjectDto: CreateProjectDto): Promise<IProjectEntity> {
    this.createProjectDto = createProjectDto;

    const policy: Policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.PROJECTS_ADMIN_MASTER_INSERT):
        return await this.createByAdminMaster();

      case policy.haveRule(RulesEnum.PROJECTS_PROJECT_MANAGER_INSERT) ||
        policy.haveRule(RulesEnum.PROJECTS_TEAM_LEADER_INSERT):
        return await this.createByAccess();

      default:
        policy.policyException();
    }
  }

  private async createByAdminMaster(): Promise<IProjectEntity> {
    await ProjectValidations.projectExistsByName(
      this.createProjectDto.name,
      this.projectRepository,
    );

    await this.handlePopulateDefaultData();

    return await this.projectRepository.create(this.createProjectDto);
  }

  private async createByAccess(): Promise<IProjectEntity> {
    await ProjectValidations.projectExistsByName(
      this.createProjectDto.name,
      this.projectRepository,
    );

    await this.handlePopulateDefaultData();

    const project = await this.projectRepository.create(this.createProjectDto);

    await this.crateProjectTeamUserRelation(project);

    return project;
  }

  private async handlePopulateDefaultData(): Promise<void> {
    const icon = await this.iconRepository.findByName('AnchorIcon');

    this.createProjectDto.icon_id = icon.id;
    this.createProjectDto.unique_name = Helper.stringUniqueName(
      this.createProjectDto.name,
    );
  }

  private async crateProjectTeamUserRelation(
    project: IProjectEntity,
  ): Promise<void> {
    const teamUser = await this.getTeamUser();

    await this.teamUserRepository.createProjectsRelation(teamUser, [
      project.id,
    ]);
  }
}
