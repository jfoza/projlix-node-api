import { CreateUserDto } from '@/features/users/user/presentation/dto/create-user.dto';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTeamUserDto extends CreateUserDto {
  @IsOptional()
  @IsString()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  profile: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  projects?: string[] = [];
}
