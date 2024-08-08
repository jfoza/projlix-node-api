import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthController } from '@/auth/presentation/controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/users/user/domain/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@/users/user/modules/user.module';
import { AuthRepository } from '@/auth/domain/repositories/auth.repository';
import { AuthEntity } from '@/auth/domain/entities/auth.entity';
import { AuthResponse } from '@/auth/types/auth.response.type';
import { RuleModule } from '@/users/rule/modules/rule.module';
import { LoginService } from '@/auth/presentation/services/login.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity, UserEntity]),
    UserModule,
    RuleModule,
    JwtModule.registerAsync({
      global: true,
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: +configService.get<number>('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthResponse,
    AuthRepository,
    { provide: 'IAuthRepository', useExisting: AuthRepository },

    LoginService,
    { provide: 'ILoginService', useExisting: LoginService },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
