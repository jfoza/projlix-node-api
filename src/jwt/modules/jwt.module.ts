import { Global, Module } from '@nestjs/common';
import { JwtAuthService } from '@/jwt/presentation/services/jwt-auth.service';
import { JwtInfoService } from '@/jwt/presentation/services/jwt-info.service';

@Global()
@Module({
  providers: [JwtInfoService, JwtAuthService],
  exports: [JwtInfoService, JwtAuthService],
})
export class JwtModule {}
