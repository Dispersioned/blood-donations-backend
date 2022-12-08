import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { createPatientDto } from './dto/create-patient.dto';
import { updatePatientDto } from './dto/update-patient.dto';
import { Patient } from './patients.model';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private readonly patientsRepository: typeof Patient,
    private readonly usersService: UsersService
  ) {}

  async createPatient(dto: createPatientDto) {
    const patient = await this.patientsRepository.create(dto);
    return patient;
  }

  async getAllPatients() {
    const patients = await this.patientsRepository.scope('withForeignKeys').findAll();
    return patients;
  }

  async getPatientByUserId(id: number) {
    const patient = await this.patientsRepository.scope('withForeignKeys').findOne({
      where: {
        userId: id,
      },
    });
    return patient;
  }

  async getPatientById(id: number) {
    const patient = await this.patientsRepository.findOne({
      where: {
        id,
      },
    });
    return patient;
  }

  async updatePatient(dto: updatePatientDto) {
    const patient = await this.patientsRepository.findByPk(dto.patientId);
    if (!patient) throw new BadRequestException('Пациент не найден');

    if (patient.user.username !== dto.username) {
      const potentialUser = await this.usersService.getUserByName(dto.username);
      if (potentialUser) throw new BadRequestException('Пользователь с таким именем уже существует');
      patient.user.set('username', dto.username);
      await patient.user.save();
    }

    patient.$set('doctor', dto.doctorId);
    patient.$set('hospital', dto.hospitalId);
    await patient.save();

    return patient;
  }
}
