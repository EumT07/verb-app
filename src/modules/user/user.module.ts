import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [UserService, PrismaService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwtSecret'),
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],
  controllers: [UserController],
  exports: [UserModule,UserService]
})
export class UserModule {}
