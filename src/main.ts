import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import init from './holidays/holidays.resource';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  init();
  await app.listen(8080);
}
bootstrap();
