import { Module } from '@nestjs/common';
import { VerbsService } from './verbs.service';
import { VerbsController } from './verbs.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [VerbsService, PrismaService],
  controllers: [VerbsController]
})
export class VerbsModule {}
