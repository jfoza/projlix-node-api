import { IProjectIconUpdateService } from '@/features/projects/project/interfaces/services/project-icon-update.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { ProjectIconDto } from '@/features/projects/project/presentation/dto/project-icon.dto';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { IIconRepository } from '@/features/general/icons/interfaces/repositories/icon.repository.interface';
import { RulesEnum } from '@/common/enums/rules.enum';
import { IconValidations } from '@/features/general/icons/application/validations/icon.validations';
import { IProjectListByIdUseCase } from '@/features/projects/project/interfaces/use-cases/project-list-by-id.use-case.interface';

@Injectable()
export class ProjectIconUpdateService
  extends Service
  implements IProjectIconUpdateService
{
  private id: string;
  private projectIconDto: ProjectIconDto;

  @Inject('IProjectListByIdUseCase')
  private readonly projectListByIdUseCase: IProjectListByIdUseCase;

  @Inject('IProjectRepository')
  private readonly projectRepository: IProjectRepository;

  @Inject('IIconRepository')
  private readonly iconRepository: IIconRepository;

  handle(id: string, projectIconDto: ProjectIconDto): Promise<IProjectEntity> {
    this.id = id;
    this.projectIconDto = projectIconDto;

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

    return await this.projectRepository.updateIcon(
      this.id,
      this.projectIconDto,
    );
  }

  private async updateByAccess(): Promise<IProjectEntity> {
    await this.handleValidations();

    await this.canAccessProjects([this.id]);

    return await this.projectRepository.updateIcon(
      this.id,
      this.projectIconDto,
    );
  }

  private async handleValidations(): Promise<void> {
    await this.projectListByIdUseCase
      .setId(this.id)
      .setRelations(['tags'])
      .execute();

    await IconValidations.iconExists(
      this.projectIconDto.iconId,
      this.iconRepository,
    );
  }
}
