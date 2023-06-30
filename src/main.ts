import { Reflector } from '@nestjs/core';
import { VerifyAuth } from './guards/verifyAuth.guard';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const { SERVE_PORT } = process.env;
  const app = await NestFactory.create(AppModule);

  const swaggerOptions = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);
  app.useGlobalGuards(new VerifyAuth(new Reflector()));
  await app.listen(SERVE_PORT);
}

bootstrap();
