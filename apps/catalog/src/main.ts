import { NestFactory } from '@nestjs/core';
import { CatalogModule } from './catalog.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'Catalog Microservice';
  const logger = new Logger('Catalog Microservice');
  const PORT = process.env.CATALOG_TCP_PORT ?? 4011;
  const RABBITMQ_URL = process.env.RABBITMQ_URL ?? 'amqp://localhost:5672';
  const CATALOG_QUEUE = process.env.CATALOG_QUEUE ?? 'catalog_queue';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CatalogModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: CATALOG_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  });

  app.enableShutdownHooks();

  await app.listen();

  logger.log(`Catalog Microservice is running on port ${PORT}`);
}

bootstrap();
