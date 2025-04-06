import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import configuration from './config/configuration';
import { PrismaService } from './modules/prisma/prisma.service';
import { UserModule } from './modules/user/user.module';
import { EmailModule } from './providers/email/email.module';
import { VerbsModule } from './modules/verbs/verbs.module';
import { DeepseekAiModule } from './modules/deepseek-ai/deepseek-ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    AuthModule,
    PrismaModule,
    UserModule,
    EmailModule,
    VerbsModule,
    DeepseekAiModule,
  ],
  controllers: [],
  providers: [
    AppService,
    ConfigService,
    PrismaService
  ],
})
export class AppModule {}