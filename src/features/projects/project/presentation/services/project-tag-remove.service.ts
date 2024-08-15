import { IProjectTagRemoveService } from '@/features/projects/project/interfaces/services/project-tag-remove.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { ProjectTagDto } from '@/features/projects/project/presentation/dto/project-tag.dto';
import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { ITagRepository } from '@/features/general/tags/interfaces/repositories/tag.repository.interface';
import { RulesEnum } from '@/common/enums/rules.enum';
import { ProjectValidations } from '@/features/projects/project/application/validations/project.validations';
import { TagValidations } from '@/features/general/tags/application/validations/tag.validations';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';

@Injectable()
export class ProjectTagRemoveService
  extends Service
  implements IProjectTagRemoveService
{
  private projectTagDto: ProjectTagDto;
  private project: IProjectEntity;

  @Inject('IProjectRepository')
  private readonly projectRepository: IProjectRepository;

  @Inject('ITagRepository')
  private readonly tagRepository: ITagRepository;

  async handle(projectTagDto: ProjectTagDto): Promise<void> {
    this.projectTagDto = projectTagDto;

    const policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.PROJECTS_ADMIN_MASTER_TAGS_DELETE):
        return this.removeByAdminMaster();

      case policy.haveRule(RulesEnum.PROJECTS_PROJECT_MANAGER_TAGS_DELETE) ||
        policy.haveRule(RulesEnum.PROJECTS_TEAM_LEADER_TAGS_DELETE):
        return this.removeByAccess();

      default:
        policy.policyException();
    }
  }

  private async removeByAdminMaster(): Promise<void> {
    await this.handleValidations();

    await this.removeTagRelation();
  }

  private async removeByAccess(): Promise<void> {
    await this.handleValidations();

    await this.canAccessProjects([this.project.id]);

    await this.removeTagRelation();
  }

  private async handleValidations(): Promise<void> {
    this.project = await ProjectValidations.projectExists(
      this.projectTagDto.project_id,
      this.projectRepository,
    );

    await TagValidations.tagExists(
      this.projectTagDto.tag_id,
      this.tagRepository,
    );
  }

  private async removeTagRelation(): Promise<void> {
    const tagHasAlreadyAdded = this.project.tags.some(
      (item) => item.id === this.projectTagDto.tag_id,
    );

    if (tagHasAlreadyAdded) {
      await this.projectRepository.removeTagRelation(this.projectTagDto);
    }
  }
}
