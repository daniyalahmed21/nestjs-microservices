import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  
  ping() {
    return {
      ok: true,
      timestamp: new Date().toISOString(),
      service: 'Catalog Service',
    }
  }
}
