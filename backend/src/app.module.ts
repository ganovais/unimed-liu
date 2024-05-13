import { Module } from '@nestjs/common';
import { AppointmentController } from './controllers/appointment.controller';
import { AppointmentService } from './services/appointment.service';
import { PrismaService } from './prisma.service';
import { DatabaseModule } from './database/database.module';
import { PatientService } from './services/patient.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, PatientService, PrismaService],
})
export class AppModule {}
