import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  short_name?: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
