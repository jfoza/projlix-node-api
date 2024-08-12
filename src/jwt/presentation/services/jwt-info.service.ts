import { Inject, Injectable, Scope } from '@nestjs/common';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { IUserRepository } from '@/features/users/user/interfaces/repositories/user.repository.interface';

@Injectable({ scope: Scope.REQUEST })
export class JwtInfoService {
  private user: any;

  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  setUser(user: any) {
    this.user = user;
  }

  getUser(): IUserEntity {
    return this.user;
  }

  async getUserRelations(relation: string): Promise<IUserEntity | null> {
    if (this.user && !this.user[relation]) {
      return await this.userRepository.findByUserLoggedById(
        this.user.id,
        relation,
      );
    }

    return this.user;
  }
}
