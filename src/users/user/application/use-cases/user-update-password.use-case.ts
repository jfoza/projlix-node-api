import { IUserUpdatePasswordUseCase } from '@/users/user/interfaces/use-cases/user-update-password.use-case.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@/users/user/interfaces/repositories/user.repository.interface';
import { Hash } from '@/shared/utils/hash';

@Injectable()
export class UserUpdatePasswordUseCase implements IUserUpdatePasswordUseCase {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  async execute(userId: string, newPassword: string): Promise<void> {
    const newPasswordAux: string = await Hash.createHash(newPassword);

    await this.userRepository.updatePassword(userId, newPasswordAux);
  }
}
