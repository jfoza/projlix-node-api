import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  private user: any;

  setUser(user: any) {
    this.user = user;
  }

  getUser(): any {
    return this.user;
  }
}
