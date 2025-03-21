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
                    content: `I'm going to provide you a verb, and I just want you create an info like output that I'm giving you. You must include sentences in third person like: he, she and it, using the correct form of the verba and I hope get at least an array with thre or four exercises

                    Example INPUT: To Do

                    Example JSON OUTPUT:

                    {
                        "verb": "To Do",
                        "definition": "Definition of the verb to do",
                        "translation" : {
                            "spanish" : "meaning of the verb to do in Spanish",
                            "portuguese": "meaning of the verbs to do in Portuguse"
                        },
                        "sentences" : {
                            "present": [four exercises],
                            "past": [four exercises],
                            "past_Participle": [four exercises],
                            "present_Participle": [four exercises],
                            "future": [four exercises]
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
