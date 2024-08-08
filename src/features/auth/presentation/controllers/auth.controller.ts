import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ILoginService } from '@/features/auth/interfaces/services/login.service.interface';
import { AuthDto } from '@/features/auth/presentation/dto/auth.dto';
import { AuthResponse } from '@/features/auth/types/auth.response.type';

@Controller('auth')
export class AuthController {
  @Inject('ILoginService')
  private readonly authService: ILoginService;

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() authDto: AuthDto,
    @Req() request: Request,
  ): Promise<AuthResponse> {
    authDto.ip_address = request.ip;

    return this.authService.handle(authDto);
  }
}
