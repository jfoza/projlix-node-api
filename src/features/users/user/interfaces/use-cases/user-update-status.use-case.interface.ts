import { IUserStatusUpdated } from '@/features/users/user/interfaces/responses/user-status-updated.interface';

export interface IUserUpdateStatusUseCase {
  execute(userId: string, newStatus: boolean): Promise<IUserStatusUpdated>;
}
