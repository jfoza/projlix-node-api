import { IProjectInfoUpdateService } from '@/features/projects/project/interfaces/services/project-info-update.service.interface';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { ProjectInfoUpdateDto } from '@/features/projects/project/presentation/dto/project-info-update.dto';
import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { RulesEnum } from '@/common/enums/rules.enum';
import { ProjectValidations } from '@/features/projects/project/application/validations/project.validations';
import { Helper } from '@/common/helpers';
import { IProjectListByIdUseCase } from '@/features/projects/project/interfaces/use-cases/project-list-by-id.use-case.interface';

@Injectable()
export class ProjectInfoUpdateService
  extends Service
  implements IProjectInfoUpdateService
{
  private id: string;
  private projectInfoUpdateDto: ProjectInfoUpdateDto;

  @Inject('IProjectRepository')
  private readonly projectRepository: IProjectRepository;

  @Inject('IProjectListByIdUseCase')
  private readonly projectListByIdUseCase: IProjectListByIdUseCase;

  handle(
    id: string,
    projectInfoUpdateDto: ProjectInfoUpdateDto,
  ): Promise<IProjectEntity> {
    this.id = id;
    this.projectInfoUpdateDto = projectInfoUpdateDto;

    const policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.PROJECTS_ADMIN_MASTER_ICON_UPDATE):
        return this.updateByAdminMaster();

      case policy.haveRule(RulesEnum.PROJECTS_PROJECT_MANAGER_ICON_UPDATE) ||
        policy.haveRule(RulesEnum.PROJECTS_TEAM_LEADER_ICON_UPDATE):
        return this.updateByAccess();

      default:
        policy.policyException();
    }
  }

  private async updateByAdminMaster(): Promise<IProjectEntity> {
    await this.handleValidations();

    return await this.projectRepository.updateInfo(
      this.id,
      this.projectInfoUpdateDto,
    );
  }

  private async updateByAccess(): Promise<IProjectEntity> {
    await this.handleValidations();

    await this.canAccessProjects([this.id]);

    return await this.projectRepository.updateInfo(
      this.id,
      this.projectInfoUpdateDto,
    );
  }

  private async handleValidations(): Promise<void> {
    await this.projectListByIdUseCase.setId(this.id).execute();

    await ProjectValidations.projectExistsByName(
      this.projectInfoUpdateDto.name,
      this.projectRepository,
    );

    this.projectInfoUpdateDto.uniqueName = Helper.stringUniqueName(
      this.projectInfoUpdateDto.name,
    );
  }
}
