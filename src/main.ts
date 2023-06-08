import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';

configDotenv();
const { SERVE_PORT } = process.env;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(SERVE_PORT);
}
bootstrap();
