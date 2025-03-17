import { Module } from '@nestjs/common';
import { DeepseekAiController } from './deepseek-ai.controller';
import { DeepseekAiService } from './deepseek-ai.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [DeepseekAiController],
  providers: [DeepseekAiService]
})
export class DeepseekAiModule {}
