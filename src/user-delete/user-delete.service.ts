import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { PatientsService } from 'src/patients/patients.service';
import { UsersService } from 'src/users/users.service';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UserDeleteService {
  constructor(private readonly usersService: UsersService, private readonly patientsService: PatientsService) {}

  async deleteDoctor(dto: DeleteUserDto) {
    const doctor = await this.usersService.getUserById(dto.userId);
    if (!doctor) throw new BadRequestException('Доктор не найден');

    const patients = await this.patientsService.getDoctorPatients(doctor.id);
    if (patients.length > 0) throw new BadRequestException('У этого доктора есть пациенты');

    doctor.destroy();
  }

  async deletePatient(dto: DeleteUserDto) {
    const patient = await this.patientsService.getPatientByUserId(dto.userId);
    if (!patient) throw new BadRequestException('Пациент не найден');

    patient.destroy();
    console.log('patient :>> ', patient);
    patient.user.destroy();
  }
}
