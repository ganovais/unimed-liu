import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppointmentService } from '../services/appointment.service';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointment: AppointmentService) {}

  @Post()
  async receive(@Body() request: any) {
    let success = true;
    let message = '';

    try {
      await this.appointment.create(request);
    } catch (error) {
      success = false;
      message = error.message;
    }

    return { success, message };
  }

  @Get()
  async get() {
    return this.appointment.getAll();
  }
}
