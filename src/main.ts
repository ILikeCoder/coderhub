import { Reflector } from '@nestjs/core';
import { VerifyAuth } from './guards/verifyAuth.guard';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';
configDotenv();
const { SERVE_PORT } = process.env;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new VerifyAuth(new Reflector()));
  await app.listen(SERVE_PORT);
}
bootstrap();
