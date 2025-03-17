import { Body, Controller, Post } from '@nestjs/common';
import { DeepseekAiService } from './deepseek-ai.service';

@Controller('deepseek')
export class DeepseekAiController {

    constructor(
        private readonly DeepService : DeepseekAiService
    ){}

    @Post("api")
    async sendPrompt(
        @Body('verb') verb: string
    ){
        return this.DeepService.deepSeekData(verb)
    }
}
