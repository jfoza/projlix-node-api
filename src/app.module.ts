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
import { ColorsModule } from './features/general/colors/modules/colors.module';
import { IconsModule } from './features/general/icons/modules/icons.module';
import { TagsModule } from './features/general/tags/modules/tags.module';
import { CommandsModule } from './commands/modules/commands.module';
import { TeamUserModule } from './features/users/team-user/modules/team-user.module';
import { SectionModule } from './features/projects/section/modules/section.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommandsModule,
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
    ColorsModule,
    IconsModule,
    TagsModule,
    TeamUserModule,
    SectionModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
