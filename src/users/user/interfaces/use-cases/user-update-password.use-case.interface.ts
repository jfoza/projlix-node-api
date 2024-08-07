export interface IUserUpdatePasswordUseCase {
  execute(userId: string, newPassword: string): Promise<void>;
}
