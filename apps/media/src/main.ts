import { NestFactory } from '@nestjs/core';
import { MediaModule } from './media.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  process.title = 'Media Microservice';
  const PORT = process.env.MEDIA_TCP_PORT ?? 4012;
  const logger = new Logger('Media Microservice');
  const RABBITMQ_URL = process.env.RABBITMQ_URL ?? 'amqp://localhost:5672';
  const MEDIA_QUEUE = process.env.MEDIA_QUEUE ?? 'media_queue';
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MediaModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RABBITMQ_URL],
        queue: MEDIA_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    }
  );

  app.enableShutdownHooks();
  await app.listen();

  logger.log(`Media RMQ Microservice is running on port ${PORT} and queue ${MEDIA_QUEUE}`);
}

bootstrap();
