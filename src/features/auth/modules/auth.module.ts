import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthEntity } from '@/features/auth/domain/entities/auth.entity';
import { UserEntity } from '@/features/users/user/domain/entities/user.entity';
import { UserModule } from '@/features/users/user/modules/user.module';
import { RuleModule } from '@/features/users/rule/modules/rule.module';
import { AuthResponse } from '@/features/auth/types/auth.response.type';
import { AuthRepository } from '@/features/auth/domain/repositories/auth.repository';
import { LoginService } from '@/features/auth/presentation/services/login.service';
import { AuthController } from '@/features/auth/presentation/controllers/auth.controller';

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
