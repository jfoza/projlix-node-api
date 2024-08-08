import { ILoginService } from '@/features/auth/interfaces/services/login.service.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from '@/features/auth/presentation/dto/auth.dto';
import { IUserEntity } from '@/features/users/user/interfaces/entities/user-entity.interface';
import { IUserRepository } from '@/features/users/user/interfaces/repositories/user.repository.interface';
import { IAuthRepository } from '@/features/auth/interfaces/repositories/auth.repository.interface';
import { IRuleRepository } from '@/features/users/rule/interfaces/repositories/rule.repository.interface';
import { JwtAuthService } from '@/jwt/presentation/services/jwt-auth.service';
import { AuthResponse } from '@/features/auth/types/auth.response.type';
import { IJwtToken } from '@/jwt/interfaces/jwt-token.interface';
import { IRuleEntity } from '@/features/users/rule/interfaces/entities/rule.entity.interface';
import moment from 'moment';
import { AuthTypesEnum } from '@/common/enums/auth-types.enum';
import { Hash } from '@/common/utils/hash';

@Injectable()
export class LoginService implements ILoginService {
  private authDto: AuthDto;
  private user: IUserEntity;

  @Inject('IUserRepository')
  private readonly userRepository: IUserRepository;

  @Inject('IAuthRepository')
  private readonly authRepository: IAuthRepository;

  @Inject('IRuleRepository')
  private readonly ruleRepository: IRuleRepository;

  @Inject(JwtAuthService)
  private readonly jwtAuthService: JwtAuthService;

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
    const payload = { sub: this.user.id, user: this.user };

    const authenticate: IJwtToken = this.jwtAuthService.authenticate(payload);

    this.response.token = authenticate.token;
    this.response.type = authenticate.type;
    this.response.expiresIn = `${authenticate.expiration / 86400}days`;

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
    this.authDto.auth_type = AuthTypesEnum.EMAIL_PASSWORD;

    await this.authRepository.create(this.authDto);
  }
}
