import { AuthDto } from '@/auth/presentation/dto/auth.dto';
import { IAuthEntity } from '@/auth/interfaces/entities/auth.entity.interface';

export interface IAuthRepository {
  create(authDto: AuthDto): Promise<IAuthEntity>;
}
