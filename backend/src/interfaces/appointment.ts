import { Patient } from './patient';

export interface Appointment {
  id?: string;

  alexaServiceId: number;
  alexaServiceName: string;

  unitCode: string;
  type: string;
  number: number;
  codeSector: string;
  sector: string;
  typeSector: string;
  patientId: string;

  patient: Patient;

  createdAt?: Date;
  updateAt?: Date;
  deletedAt?: Date;
}
