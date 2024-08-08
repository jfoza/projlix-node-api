import { AuthDto } from '@/features/auth/presentation/dto/auth.dto';
import { IAuthEntity } from '@/features/auth/interfaces/entities/auth.entity.interface';

export interface IAuthRepository {
  create(authDto: AuthDto): Promise<IAuthEntity>;
}
