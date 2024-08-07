import { IUserUpdateStatusUseCase } from '@/users/user/interfaces/use-cases/user-update-status.use-case.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@/users/user/interfaces/repositories/user.repository.interface';
import { IUserStatusUpdated } from '@/users/user/interfaces/responses/user-status-updated.interface';

@Injectable()
export class UserUpdateStatusUseCase implements IUserUpdateStatusUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  async execute(
    userId: string,
    newStatus: boolean,
  ): Promise<IUserStatusUpdated> {
    await this.userRepository.updateStatus(userId, newStatus);

    return { id: userId, active: newStatus };
  }
}
