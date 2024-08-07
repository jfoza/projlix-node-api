import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from '@/auth/presentation/dto/auth.dto';
import { IUserEntity } from '@/users/user/interfaces/entities/user-entity.interface';
import { IUserRepository } from '@/users/user/interfaces/repositories/user.repository.interface';
import { Hash } from '@/shared/utils/hash';
import { IAuthService } from '@/auth/interfaces/services/auth.service.interface';
import { IAuthRepository } from '@/auth/interfaces/repositories/auth.repository.interface';
import { AuthResponse } from '@/auth/types/auth.response.type';
import moment from 'moment';
import { UserTypesEnum } from '@/shared/enums/auth-types.enum';
import { IRuleRepository } from '@/users/rule/interfaces/repositories/rule.repository.interface';
import { IRuleEntity } from '@/users/rule/interfaces/entities/rule.entity.interface';

@Injectable()
export class AuthService implements IAuthService {
  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  @Inject('IAuthRepository')
  private readonly authRepository: IAuthRepository;

  @Inject('IRuleRepository')
  private readonly ruleRepository: IRuleRepository;

  private authDto: AuthDto;
  private user: IUserEntity;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(ConfigService)
  private readonly configService: ConfigService;

  @Inject(AuthResponse)
  private readonly response: AuthResponse;

  async handle(authDto: AuthDto): Promise<AuthResponse> {
    this.authDto = authDto;

    await this.handleValidations();
    await this.generateAuth();
    await this.createAuthInfo();

    return this.response;
  }

  private async handleValidations(): Promise<void> {
    this.user = await this.userRepository.findByEmail(this.authDto.email);

    if (!this.user) {
      throw new UnauthorizedException();
    }

    if (!(await Hash.compareHash(this.authDto.password, this.user.password))) {
      throw new UnauthorizedException();
    }
  }

  private async generateAuth(): Promise<void> {
    const payload = { sub: this.user.id, email: this.user.email };

    const token: string = this.jwtService.sign(payload);

    const expiresIn: number = +this.configService.get('JWT_EXPIRATION') / 86400;

    this.response.token = token;
    this.response.type = 'jwt';
    this.response.expiresIn = `${expiresIn}days`;

    const ability: IRuleEntity[] = await this.ruleRepository.findAllByUserId(
      this.user.id,
    );

    this.response.user = {
      id: this.user.id,
      email: this.user.email,
      fullName: this.user.name,
      role: this.user.profile.description,
      status: this.user.profile.active,
      ability,
    };
  }

  private async createAuthInfo(): Promise<void> {
    this.authDto.user_id = this.user.id;
    this.authDto.initial_date = moment().toDate();
    this.authDto.final_date = moment().add(2, 'days').toDate();
    this.authDto.token = this.response.token;
    this.authDto.auth_type = UserTypesEnum.EMAIL_PASSWORD;

    await this.authRepository.create(this.authDto);
  }
}
