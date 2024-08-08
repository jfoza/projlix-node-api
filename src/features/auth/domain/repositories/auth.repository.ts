import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '@/features/auth/interfaces/repositories/auth.repository.interface';
import { AuthEntity } from '@/features/auth/domain/entities/auth.entity';
import { AuthDto } from '@/features/auth/presentation/dto/auth.dto';
import { IAuthEntity } from '@/features/auth/interfaces/entities/auth.entity.interface';

@Injectable()
export class AuthRepository implements IAuthRepository {
  @InjectRepository(AuthEntity)
  private readonly repository: Repository<AuthEntity>;

  create(authDto: AuthDto): Promise<IAuthEntity> {
    const { user_id, initial_date, final_date, token, ip_address, auth_type } =
      authDto;

    const auth: AuthEntity = this.repository.create({
      user_id,
      initial_date,
      final_date,
      token,
      ip_address,
      auth_type,
    });

    return this.repository.save(auth);
  }
}
