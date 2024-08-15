import { IProjectAddTagService } from '@/features/projects/project/interfaces/services/project-add-tag.service.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { ProjectTagDto } from '@/features/projects/project/presentation/dto/project-tag.dto';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { RulesEnum } from '@/common/enums/rules.enum';
import { ProjectValidations } from '@/features/projects/project/application/validations/project.validations';
import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { TagValidations } from '@/features/general/tags/application/validations/tag.validations';
import { ITagRepository } from '@/features/general/tags/interfaces/repositories/tag.repository.interface';
import { ITagEntity } from '@/features/general/tags/interfaces/entities/tag.entity';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';

@Injectable()
export class ProjectAddTagService
  extends Service
  implements IProjectAddTagService
{
  private projectTagDto: ProjectTagDto;
  private project: IProjectEntity;
  private tag: ITagEntity;

  @Inject('IProjectRepository')
  private readonly projectRepository: IProjectRepository;

  @Inject('ITagRepository')
  private readonly tagRepository: ITagRepository;

  async handle(projectTagDto: ProjectTagDto): Promise<IProjectEntity> {
    this.projectTagDto = projectTagDto;

    const policy = this.getPolicy();

    switch (true) {
      case policy.haveRule(RulesEnum.PROJECTS_ADMIN_MASTER_TAGS_INSERT):
        return this.addByAdminMaster();

      case policy.haveRule(RulesEnum.PROJECTS_PROJECT_MANAGER_TAGS_INSERT) ||
        policy.haveRule(RulesEnum.PROJECTS_TEAM_LEADER_TAGS_INSERT):
        return this.addByAccess();

      default:
        policy.policyException();
    }
  }

  private async addByAdminMaster(): Promise<IProjectEntity> {
    await this.handleValidations();

    return await this.addTag();
  }

  private async addByAccess(): Promise<IProjectEntity> {
    await this.handleValidations();

    await this.canAccessProjects([this.project.id]);

    return await this.addTag();
  }

  private async handleValidations(): Promise<void> {
    this.project = await ProjectValidations.projectExists(
      this.projectTagDto.project_id,
      this.projectRepository,
    );

    this.tag = await TagValidations.tagExists(
      this.projectTagDto.tag_id,
      this.tagRepository,
    );

    const tagHasAlreadyAdded = this.project.tags.some(
      (item) => item.id === this.tag.id,
    );

    if (tagHasAlreadyAdded) {
      throw new BadRequestException(
        ErrorMessagesEnum.TAG_ALREADY_ADDED_IN_PROJECT,
      );
    }
  }

  private async addTag(): Promise<IProjectEntity> {
    await this.projectRepository.saveTagsRelation(this.project, [
      this.projectTagDto.tag_id,
    ]);

    this.project.tags.push(this.tag);

    return this.project;
  }
}
