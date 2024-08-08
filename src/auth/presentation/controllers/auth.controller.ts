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
import { Request } from 'express';
import { AuthResponse } from '@/auth/types/auth.response.type';
import { ILoginService } from '@/auth/interfaces/services/login.service.interface';

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
