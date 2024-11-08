import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './docs';


async function bootstrap() {
  const logger = new Logger("Main");
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  //Cors
  app.enableCors();

  //Prefix
  app.setGlobalPrefix('api/v1')

  //validation DTOs.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  //Docs : Swagger Documentations
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, swaggerDoc);

  //Port
  await app.listen(configService.get<number>("port"));
  logger.log(`Server is running on PORT: ${configService.get<number>('port')}`);
}
bootstrap();
