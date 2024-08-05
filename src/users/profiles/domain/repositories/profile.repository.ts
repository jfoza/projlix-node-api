import { IProfileRepository } from '@/users/profiles/interfaces/repositories/profile.repository.interface';
import { IProfileEntity } from '@/users/profiles/interfaces/entities/profile.entity.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '@/users/profiles/domain/entities/profile.entity';
import { Injectable } from '@nestjs/common';

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
