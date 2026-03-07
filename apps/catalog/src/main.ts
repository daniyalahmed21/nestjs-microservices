import { NestFactory } from '@nestjs/core';
import { CatalogModule } from './catalog.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'Catalog Microservice';
  const logger = new Logger('Catalog Microservice');
  const PORT = process.env.CATALOG_TCP_PORT ?? 4011;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CatalogModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: Number(PORT),
    },
  });

  app.enableShutdownHooks();

  await app.listen();

  logger.log(`Catalog Microservice is running on port ${PORT}`);
}

bootstrap();
