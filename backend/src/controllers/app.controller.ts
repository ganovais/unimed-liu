import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/check-cpf/:cpf')
  checkCpf(@Param('cpf') cpf: string) {
    console.log(cpf);
    return {
      valid: true,
      name: 'Gabriel Novais',
    };
  }

  @Post()
  receive(@Body() request: any) {
    console.log(JSON.stringify(request, null, 4));

    return { success: true, message: 'error message from backend' };
  }
}
