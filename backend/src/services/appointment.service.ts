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
      where: { closedAt: null, deletedAt: null },
    });
  }

  async getBySector(sector: string) {
    return this.prisma.appointment.findMany({
      include: { patient: true },
      where: { closedAt: null, deletedAt: null, category: sector },
    });
  }

  async create(data: Appointment) {
    const patient = await this.patient.findOrCreate(get(data, 'patient'));

    const appointmentToCreate = {
      category: get(data, 'where'),
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

  async close(appointmentId: string) {
    return this.prisma.appointment.update({
      where: { id: appointmentId },
      data: { closedAt: new Date() },
    });
  }
}
