import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(
    @Inject('CATALOG_CLIENT') private readonly catalogClient: ClientProxy,
    @Inject('MEDIA_CLIENT') private readonly mediaClient: ClientProxy,
    @Inject('SEARCH_CLIENT') private readonly searchClient: ClientProxy,
  ) {}

  @Get('health')
  async healthCheck() {

    const ping = async (serviceName: string, client: ClientProxy) => {
      try {
        const response = await firstValueFrom(
          client.send('service.ping', { from: 'gateway' })
        );

        return {
          ok: true,
          timestamp: new Date().toISOString(),
          service: serviceName,
        };

      } catch (error) {
        return {
          ok: false,
          timestamp: new Date().toISOString(),
          service: serviceName,
          error: error.message,
        };
      }
    };

    const [catalog, media, search] = await Promise.all([
      ping('Catalog', this.catalogClient),
      ping('Media', this.mediaClient),
      ping('Search', this.searchClient),
    ]);

    const ok = [catalog, media, search].every((service) => service.ok);

    return {
      ok,
      gateway: {
        service: 'Gateway',
        timestamp: new Date().toISOString(),
      },
      services: {
        catalog,
        media,
        search,
      },
    };
  }
}