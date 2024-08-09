import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@/database/modules/database.module';
import { AppController } from '@/app.controller';
import { AclModule } from './acl/modules/acl.module';
import { RedisModule } from '@/redis/modules/redis.module';
import { JwtMiddleware } from '@/jwt/presentation/middlewares/jwt.middleware';
import { JwtModule } from '@/jwt/modules/jwt.module';
import { AuthModule } from '@/features/auth/modules/auth.module';
import { UserModule } from '@/features/users/user/modules/user.module';
import { AdminUserModule } from '@/features/users/admin-user/modules/admin-user.module';
import { ProfileModule } from '@/features/users/profiles/modules/profiles.module';
import { RuleModule } from '@/features/users/rule/modules/rule.module';
import { ProjectModule } from './features/projects/project/modules/project.module';

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
    ProjectModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
