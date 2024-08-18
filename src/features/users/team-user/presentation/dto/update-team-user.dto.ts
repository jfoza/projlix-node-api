import { UpdateUserDto } from '@/features/users/user/presentation/dto/update-user.dto';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateTeamUserDto extends UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  profile: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  projects?: string[] = [];
}
