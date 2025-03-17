import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { response } from 'express';

@Injectable()
export class DeepseekAiService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ){}

    private readonly apiKey = this.configService.get("api_key")
    private readonly apiBaseUrl = this.configService.get("api_base_url")

    async deepSeekData(verb: string){
        const endpoint = 'chat/completions';
        const url = `${this.apiBaseUrl}/${endpoint}`;

        const payload = {
            model: "deepseek-chat",
            messages: [
                {
                    role: 'system',
                    content: `I'm going to provide you a verb, and I just want you create sentences using verbs tense like: present, past, past participle, present participle and future with going or will.

                    You can include sentences in third person like: he, she and it, using the correct form of the verb.

                    For each tense like present, past and future, I hope get at least an array with thre or four exercises

                    Example INPUT: To Do

                    Example JSON OUTPUT:

                    {
                        "verb": "To Do",
                        "Present": ["I Do my Homework","She does her job"],
                        "Past": ["They did very well","You did it","He did his best"],
                        "Past Participle": ["I have done my homework","She has done her job"],
                        "Present Participle": ["She is doing her best", "Doing task, she can get better everyday"],
                        "Future": ["We will do that","It will do its job if you do a great maintenance"]
                    }`,
                },
                {
                    role: 'user',
                    content:`Give me excercises with the verb: ${verb}`,
                }
            ],
            stream: false,
            response_format: {
                'type': 'json_object'
            }
        }

        const headers = {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
        }

        try {
            const {data} = await firstValueFrom(
                this.httpService.post(url, payload, { headers })
            )
            return data.choices[0].message.content;
        } catch (error) {
            throw new Error(`DeepSeek-AI Error: ${error.message}`);
        }
    }

}
