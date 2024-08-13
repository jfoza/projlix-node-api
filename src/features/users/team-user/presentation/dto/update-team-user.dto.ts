import { UpdateUserDto } from '@/features/users/user/presentation/dto/update-user.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateTeamUserDto extends UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  profile: string;
}
