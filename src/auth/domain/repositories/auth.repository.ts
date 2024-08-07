import { IAuthRepository } from '@/auth/interfaces/repositories/auth.repository.interface';
import { AuthDto } from '@/auth/presentation/dto/auth.dto';
import { IAuthEntity } from '@/auth/interfaces/entities/auth.entity.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from '@/auth/domain/entities/auth.entity';
import { Injectable } from '@nestjs/common';

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
