import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    RedisModule,
    AclModule,
    AuthModule,
    UserModule,
    AdminUserModule,
    ProfileModule,
    RuleModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
