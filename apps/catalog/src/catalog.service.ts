import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class CatalogService {
  
  ping() {
    return {
      ok: true,
      timestamp: new Date().toISOString(),
      service: 'Catalog Service',
    }
  }
}
