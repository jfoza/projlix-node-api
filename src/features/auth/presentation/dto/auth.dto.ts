import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  user_id: string;
  initial_date: Date;
  final_date: Date;
  token: string;
  ip_address: string;
  auth_type: string;
}
