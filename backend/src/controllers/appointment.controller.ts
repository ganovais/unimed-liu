import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Patch('/close/:appointmentId')
  async close(@Param('appointmentId') appointmentId: string) {
    await this.appointment.close(appointmentId);
    return { error: false, message: 'Atendimento fechado com sucesso.' };
  }
}
