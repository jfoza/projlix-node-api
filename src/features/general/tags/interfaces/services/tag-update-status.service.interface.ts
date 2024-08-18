import { ITagUpdateStatus } from '@/features/general/tags/interfaces/responses/tag-update-status.interface';

export interface ITagUpdateStatusService {
  handle(id: string): Promise<ITagUpdateStatus>;
}
