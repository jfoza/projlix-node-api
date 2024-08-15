export interface IProjectRemoveService {
  handle(projectId: string): Promise<void>;
}
