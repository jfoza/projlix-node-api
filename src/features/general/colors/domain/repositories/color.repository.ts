import { IColorRepository } from '@/features/general/colors/interfaces/repositories/color.repository.interface';
import { ColorEntity } from '@/features/general/colors/domain/entities/color.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ColorRepository implements IColorRepository {
  @InjectRepository(ColorEntity)
  private readonly repository: Repository<ColorEntity>;

  async findAll(): Promise<ColorEntity[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<ColorEntity> {
    return await this.repository.findOne({ where: { id } });
  }
}
