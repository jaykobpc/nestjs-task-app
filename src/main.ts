import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config({
    path: '../.env',
  });

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const SERVER_PORT = process.env.APP_PORT || 8000;
  await app.listen(SERVER_PORT);
  logger.log(`Application listening on port : ${SERVER_PORT}`);
}
bootstrap();
