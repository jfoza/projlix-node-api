import { Policy } from '@/acl/types/policy';
import { ForbiddenException, Inject } from '@nestjs/common';
import { JwtInfoService } from '@/jwt/presentation/services/jwt-info.service';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { Helper } from '@/common/helpers';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';
import { ITeamUserEntity } from '@/features/users/team-user/interfaces/entities/team-user.entity.interface';

export abstract class Service {
  @Inject(JwtInfoService)
  protected readonly jwtInfoService!: JwtInfoService;

  private policy: Policy;

  setPolicy(policy: Policy) {
    this.policy = policy;
  }

  getPolicy(): Policy {
    return this.policy;
  }

  protected async getTeamUser(): Promise<ITeamUserEntity> {
    const user = await this.jwtInfoService.getUserRelations('team_user');

    return user.team_user;
  }

  protected async getTeamUserProjects(): Promise<IProjectEntity[]> {
    const userLogged: IUserEntity =
      await this.jwtInfoService.getUserRelations('team_user.projects');

    if (!userLogged.team_user) {
      return [];
    }

    return userLogged.team_user.projects;
  }

  protected async getTeamUserProjectsId(): Promise<string[]> {
    const projects: IProjectEntity[] = await this.getTeamUserProjects();

    return Helper.pluck(projects, 'id');
  }

  protected async canAccessProjects(
    projectsId: string[],
    message: string = null,
  ): Promise<void> {
    const projects: IProjectEntity[] = await this.getTeamUserProjects();

    const exists: boolean = projectsId.some((id: string) =>
      projects.some((item: IProjectEntity): boolean => item.id === id),
    );

    if (!exists) {
      throw new ForbiddenException(
        message ? message : ErrorMessagesEnum.PROJECT_NOT_ALLOWED,
      );
    }
  }

  async canAccessEachProject(
    projectsId: string[],
    message: string = null,
  ): Promise<void> {
    const projects: IProjectEntity[] = await this.getTeamUserProjects();

    const projectIdsSet: Set<string> = new Set(
      projects.map((project: IProjectEntity) => project.id),
    );

    for (const projectId of projectsId) {
      if (!projectIdsSet.has(projectId)) {
        throw new ForbiddenException(
          message ? message : ErrorMessagesEnum.PROJECT_NOT_ALLOWED,
        );
      }
    }
  }

  protected profileHierarchyValidation(
    needle: string,
    haystack: string[],
    message: string = null,
  ): void {
    if (!haystack.includes(needle)) {
      throw new ForbiddenException(
        message ? message : ErrorMessagesEnum.USER_NOT_ALLOWED,
      );
    }
  }
}
