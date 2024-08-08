import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@/database/modules/database.module';
import { UserModule } from '@/users/user/modules/user.module';
import { AdminUserModule } from '@/users/admin-user/modules/admin-user.module';
import { ProfileModule } from '@/users/profiles/modules/profiles.module';
import { AppController } from '@/app.controller';
import { AclModule } from './acl/modules/acl.module';
import { AuthModule } from './auth/modules/auth.module';
import { RuleModule } from './users/rule/modules/rule.module';
import { RedisModule } from '@/redis/modules/redis.module';
import { JwtMiddleware } from '@/jwt/presentation/middlewares/jwt.middleware';
import { JwtModule } from '@/jwt/modules/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    RedisModule,
    JwtModule,
    AclModule,
    AuthModule,
    UserModule,
    AdminUserModule,
    ProfileModule,
    RuleModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
