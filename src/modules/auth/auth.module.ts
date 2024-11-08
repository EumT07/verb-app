import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { EmailService } from '../../providers/email/email.service';

@Module({
  providers: [AuthService, PrismaService, EmailService],
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configeService: ConfigService) => {
        return {
          secret: configeService.get("jwtSecret"),
          signOptions: {expiresIn: "24h"}
        }
      }
    }),
    PrismaModule,
    UserModule,
    AuthModule
  ]
})
export class AuthModule {}
