import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  process.title = 'Search Microservice';
  const PORT = process.env.SEARCH_TCP_PORT ?? 4013;
  const logger = new Logger('Search Microservice');
  const RABBITMQ_URL = process.env.RABBITMQ_URL ?? 'amqp://localhost:5672';
  const SEARCH_QUEUE = process.env.SEARCH_QUEUE ?? 'search_queue';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SearchModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RABBITMQ_URL],
        queue: SEARCH_QUEUE,
        queueOptions: {
          durable: false,
        },
        port: Number(PORT),
      },
    }
  );

  app.enableShutdownHooks();
  await app.listen();

  logger.log(`Search RMQ Microservice is running on port ${PORT} and queue ${SEARCH_QUEUE}`);
}
bootstrap();