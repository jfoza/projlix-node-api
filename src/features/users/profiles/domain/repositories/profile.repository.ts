import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IProfileRepository } from '@/features/users/profiles/interfaces/repositories/profile.repository.interface';
import { ProfileEntity } from '@/features/users/profiles/domain/entities/profile.entity';
import { IProfileEntity } from '@/features/users/profiles/interfaces/entities/profile.entity.interface';

@Injectable()
export class ProfileRepository implements IProfileRepository {
  @InjectRepository(ProfileEntity)
  private readonly typeOrmRepository: Repository<ProfileEntity>;

  async findAll(): Promise<IProfileEntity[]> {
    return await this.typeOrmRepository.find();
  }

  async findById(id: string): Promise<IProfileEntity> {
    return await this.typeOrmRepository.findOne({ where: { id } });
  }

  async findByUniqueName(uniqueName: string): Promise<IProfileEntity> {
    return await this.typeOrmRepository.findOne({
      where: { unique_name: uniqueName },
    });
  }
}
