import { IColorRepository } from '@/features/general/colors/interfaces/repositories/color.repository.interface';
import { ColorEntity } from '@/features/general/colors/domain/entities/color.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IColorEntity } from '@/features/general/colors/interfaces/entities/color.entity.interface';

@Injectable()
export class ColorRepository implements IColorRepository {
  @InjectRepository(ColorEntity)
  private readonly repository: Repository<ColorEntity>;

  async findAll(): Promise<IColorEntity[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<IColorEntity> {
    return await this.repository.findOne({ where: { id } });
  }
}
