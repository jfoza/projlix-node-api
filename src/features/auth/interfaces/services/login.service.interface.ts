import { AuthDto } from '@/features/auth/presentation/dto/auth.dto';
import { AuthResponse } from '@/features/auth/types/auth.response.type';

export interface ILoginService {
  handle(authDto: AuthDto): Promise<AuthResponse>;
}
