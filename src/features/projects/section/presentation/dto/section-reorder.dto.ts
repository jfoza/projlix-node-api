import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class SectionReorderDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  newOrder: number;

  @IsOptional()
  projectId?: string;
}
