import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { AuthDto } from '@/auth/presentation/dto/auth.dto';
import { IAuthService } from '@/auth/interfaces/services/auth.service.interface';
import { Request } from 'express';
import { AuthResponse } from '@/auth/types/auth.response.type';

@Controller('auth')
export class AuthController {
  @Inject('IAuthService')
  private readonly authService: IAuthService;

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
