import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get('/')
  async get() {
    return { message: 'ok' };
  }
}
