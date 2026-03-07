import { Controller, Get } from '@nestjs/common';
import { MediaService } from './media.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @MessagePattern('service.ping')
  getHello() {
    return this.mediaService.ping();
  }
}
