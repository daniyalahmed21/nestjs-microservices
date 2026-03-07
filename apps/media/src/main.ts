import { NestFactory } from '@nestjs/core';
import { MediaModule } from './media.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  process.title = 'Media Microservice';
  const PORT = process.env.MEDIA_TCP_PORT ?? 4012;
  const logger = new Logger('Media Microservice');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MediaModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: Number(PORT),
      },
    }
  );

  app.enableShutdownHooks();
  await app.listen();

  logger.log(`Media Microservice is running on port ${PORT}`);
}

bootstrap();
