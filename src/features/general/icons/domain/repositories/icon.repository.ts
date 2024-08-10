import { IIconRepository } from '@/features/general/icons/interfaces/repositories/icon.repository.interface';
import { IIconEntity } from '@/features/general/icons/interfaces/entities/icon.entity.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IconEntity } from '@/features/general/icons/domain/entities/icon.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IconRepository implements IIconRepository {
  @InjectRepository(IconEntity)
  private readonly repository: Repository<IconEntity>;

  async findAll(): Promise<IIconEntity[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<IIconEntity> {
    return await this.repository.findOne({ where: { id } });
  }
}
