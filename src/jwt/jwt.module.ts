import { Global, Module } from '@nestjs/common';
import { AuthService } from '@/jwt/auth.service';

@Global()
@Module({
  providers: [AuthService],
  exports: [AuthService],
})
export class JwtModule {}
