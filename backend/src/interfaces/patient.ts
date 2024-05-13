export interface Patient {
  id?: string;
  name: string;
  code: string;
  document: string;
  birthDate: string;

  createdAt?: Date;
  updateAt?: Date;
  deletedAt?: Date;
}
