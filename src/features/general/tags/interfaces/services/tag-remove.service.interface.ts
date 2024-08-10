export interface ITagRemoveService {
  handle(id: string): Promise<void>;
}
