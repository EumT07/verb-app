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
                    content: `Generate short sentences (max 60 chars each) in third-person (he/she/it)
                        For Action verbs: Dynamic/active usage.
                        For Stative verbs: Natural, native-like usage. If unnatural in progressive tenses, use gerund (ing) as subject (e.g., "Loving her is easy").

                    Example JSON OUTPUT:

                    {
                        "sentences" : {
                            "present": [four exercises],
                            "past": [four exercises],
                            "past_Participle": [four exercises],
                            "present_Participle": [four exercises]
                        }
                    }`,
                },
                {
                    role: 'user',
                    content:`Give me a short info and excercises with the verb: ${verb}`,
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
