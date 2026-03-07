import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const logger = new Logger('Gateway');
  const PORT = process.env.GATEWAY_PORT ?? 3000;

  const app = await NestFactory.create(GatewayModule);

  app.enableShutdownHooks();
  await app.listen(PORT);

  logger.log(`Gateway is running on port ${PORT}`);
}

bootstrap();
