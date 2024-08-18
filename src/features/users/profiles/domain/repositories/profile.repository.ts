import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IProfileRepository } from '@/features/users/profiles/interfaces/repositories/profile.repository.interface';
import { ProfileEntity } from '@/features/users/profiles/domain/entities/profile.entity';
import { IProfileEntity } from '@/features/users/profiles/interfaces/entities/profile.entity.interface';
import { ProfileFiltersDto } from '@/features/users/profiles/presentation/dto/profile-filters.dto';

@Injectable()
export class ProfileRepository implements IProfileRepository {
  @InjectRepository(ProfileEntity)
  private readonly typeOrmRepository: Repository<ProfileEntity>;

  async findAll(
    profileFiltersDto: ProfileFiltersDto,
  ): Promise<IProfileEntity[]> {
    return await this.typeOrmRepository
      .createQueryBuilder('profile')
      .when(profileFiltersDto.type, (qb, type) =>
        qb
          .innerJoin('profile.profile_type', 'profile_type')
          .andWhere('profile_type.unique_name = :type', { type }),
      )
      .when(profileFiltersDto.uniqueName, (qb, profilesUniqueName) =>
        qb.andWhere('profile.unique_name IN (:...profilesUniqueName)', {
          profilesUniqueName,
        }),
      )
      .getMany();
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
