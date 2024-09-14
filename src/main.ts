import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const logger = new Logger("Main");
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  //Cors
  app.enableCors();

  //validation DTOs.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  //Port
  await app.listen(configService.get<number>("port"));
  logger.log(`Server is running on PORT: ${configService.get<number>('port')}`);
}
bootstrap();
