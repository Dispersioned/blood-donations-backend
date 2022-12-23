import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './patients.model';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private readonly patientsRepository: typeof Patient,
    private readonly usersService: UsersService
  ) {}

  async createPatient(dto: CreatePatientDto) {
    const patient = await this.patientsRepository.create(dto);
    return patient;
  }

  async getAllPatients() {
    const patients = await this.patientsRepository.scope('withForeignKeys').findAll();
    return patients;
  }

  async getPatientByUserId(userId: number) {
    const patient = await this.patientsRepository.scope('withForeignKeys').findOne({
      where: {
        userId,
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

  async getDoctorPatients(doctorId: number) {
    const patients = await this.patientsRepository.findAll({
      include: [
        {
          model: User,
          as: 'doctor',
          where: {
            id: doctorId,
          },
        },
      ],
    });

    return patients;
  }

  async updatePatient(dto: UpdatePatientDto) {
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
