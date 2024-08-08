import { AuthDto } from '@/auth/presentation/dto/auth.dto';
import { AuthResponse } from '@/auth/types/auth.response.type';

export interface ILoginService {
  handle(authDto: AuthDto): Promise<AuthResponse>;
}
