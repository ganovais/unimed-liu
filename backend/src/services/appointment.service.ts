import { Injectable } from '@nestjs/common';
import { get } from 'lodash';

import { PrismaService } from 'src/prisma.service';
import { Appointment } from 'src/interfaces/appointment';
import { PatientService } from './patient.service';

@Injectable()
export class AppointmentService {
  constructor(
    private prisma: PrismaService,
    private patient: PatientService,
  ) {}
  async getAll() {
    return this.prisma.appointment.findMany({
      include: { patient: true },
    });
  }

  async create(data: Appointment) {
    const patient = await this.patient.findOrCreate(get(data, 'patient'));

    const appointmentToCreate = {
      alexaServiceId: get(data, 'serviceId'),
      alexaServiceName: get(data, 'serviceName'),
      patientId: patient.id,

      unitCode: get(data, 'patient.codigoUnidadeBasica'),
      type: get(data, 'patient.tipoAtendimento'),
      number: Number(get(data, 'patient.numeroAtendimento')),
      codeSector: get(data, 'patient.codigoSetorAtendimento'),
      sector: get(data, 'patient.setorAtendimento'),
      typeSector: get(data, 'patient.tipoSetor'),
    };

    return this.prisma.appointment.create({
      data: appointmentToCreate,
    });
  }
}
