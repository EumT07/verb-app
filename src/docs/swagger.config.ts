import { DocumentBuilder } from "@nestjs/swagger";

//Config swagger docs
export const swaggerConfig = new DocumentBuilder()
    .setTitle("English Verbs App")
    .setDescription('Thes best web to learn English verbs, you will find all verbs most used by spoken english')
    .setVersion("0.0.1")
    .addTag("EnglisVerbsApp")
    .build()