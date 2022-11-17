import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { createPatientDto } from './dto/create-patient.dto';
import { Patient } from './patients.model';

@Injectable()
export class PatientsService {
  constructor(@InjectModel(Patient) private readonly patientsRepository: typeof Patient) {}

  async createPatient(dto: createPatientDto) {
    const patient = await this.patientsRepository.create(dto);
    // это иногда нужно, но непонятно когда
    // await patient.$set('user', 11);
    // await patient.$set('hospital', dto.hospitalId);
    // await patient.$set('doctor', dto.doctorId);
    return patient;
  }

  async getAllPatients() {
    const patients = await this.patientsRepository.scope('withForeignKeys').findAll({
      include: ['user', 'hospital', 'doctor'],
    });
    return patients;
  }

  async getPatientInfo(id: number) {
    console.log('id', id);
    const patient = await this.patientsRepository.scope('withForeignKeys').findOne({
      where: {
        userId: id,
      },
      // attributes: {
      //   exclude: ['user'],
      // },
      // include: ['user', 'hospital'],
    });
    console.log('patient', patient);
    return patient;
  }
}
