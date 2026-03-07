import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  process.title = 'Search Microservice';
  const PORT = process.env.SEARCH_TCP_PORT ?? 4013;
  const logger = new Logger('Search Microservice');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SearchModule,
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

  logger.log(`Search Microservice is running on port ${PORT}`);
}
bootstrap();