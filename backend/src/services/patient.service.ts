import { Injectable } from '@nestjs/common';
import { get } from 'lodash';

import { Patient } from 'src/interfaces/patient';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}
  async findByCPF(document: string) {
    return this.prisma.patient.findUnique({
      where: { document },
    });
  }

  async create(data: Patient) {
    return this.prisma.patient.create({
      data,
    });
  }

  async findOrCreate(data: Patient) {
    const document = get(data, 'cpf');

    if (!document) throw new Error('CPF não encontrado');

    let patient = await this.findByCPF(document);

    if (!patient) {
      const patientToSave: Patient = {
        name: get(data, 'nomePaciente', ''),
        document,
        code: get(data, 'codigoPaciente', ''),
        birthDate: get(data, 'dataNascimento', ''),
      };
      patient = await this.create(patientToSave);
    }
    return patient;
  }
}
