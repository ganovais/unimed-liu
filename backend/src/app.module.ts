import { Module } from '@nestjs/common';
import { AppointmentController } from './controllers/appointment.controller';
import { AppointmentService } from './services/appointment.service';
import { PrismaService } from './prisma.service';
import { DatabaseModule } from './database/database.module';
import { PatientService } from './services/patient.service';
import { HealthController } from './controllers/health.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AppointmentController, HealthController],
  providers: [AppointmentService, PatientService, PrismaService],
})
export class AppModule {}
