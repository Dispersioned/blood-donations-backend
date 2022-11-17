import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createPatientDto } from './dto/create-patient.dto';
import { Patient } from './patients.model';

@Injectable()
export class PatientsService {
  constructor(@InjectModel(Patient) private readonly patientsRepository: typeof Patient) {}

  async createPatient(dto: createPatientDto) {
    const patient = await this.patientsRepository.create(dto);
    await patient.$set('user', dto.userId);
    await patient.$set('hospital', dto.hospitalId);
    return patient;
  }

  async getAllPatients() {
    const patients = await this.patientsRepository.findAll({
      include: ['user', 'hospital'],
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
