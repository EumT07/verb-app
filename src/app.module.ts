import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import configuration from './config/configuration';
import { PrismaService } from './modules/prisma/prisma.service';
import { UserModule } from './modules/user/user.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    AuthModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    AppService,
    ConfigService,
    PrismaService
  ],
})
export class AppModule {}
