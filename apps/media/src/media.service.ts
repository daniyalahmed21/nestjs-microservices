import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaService {
  
  ping() {
    return {
      ok: true,
      timestamp: new Date().toISOString(),
      service: 'Media Service',
    }
  }
}
