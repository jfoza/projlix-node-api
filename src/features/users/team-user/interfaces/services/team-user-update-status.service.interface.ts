import { IUserUpdateStatus } from '@/features/users/admin-user/interfaces/responses/user-update-status.interface';

export interface ITeamUserUpdateStatusService {
  handle(id: string): Promise<IUserUpdateStatus>;
}
