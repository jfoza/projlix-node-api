import { Injectable } from '@nestjs/common';
import { IRuleEntity } from '@/users/rule/interfaces/entities/rule.entity.interface';

type AuthUserType = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  status: boolean;
  ability: IRuleEntity[];
};

@Injectable()
export class AuthResponse {
  token: string;
  type: string;
  expiresIn: string;
  user: AuthUserType;
}
