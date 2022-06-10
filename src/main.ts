import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('port');
  const prefix = 'api';

  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port);

  logger.log(`Server is listening on ${await app.getUrl()}`);
  logger.log(`Server is listening on http://localhost:${port}/${prefix}`);
}

bootstrap();
