import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setup } from './setup';
import * as dotenv from 'dotenv';

dotenv.config()


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: process.env.ALLOWED_METHODS, //configurar es su proprio .env
    credentials: true,
  });

  setup(app)
  await app.listen(3000);
}
bootstrap();