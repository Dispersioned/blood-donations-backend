import { BadRequestException, Injectable } from '@nestjs/common';
import { PatientsService } from 'src/patients/patients.service';
import { RequestsService } from 'src/requests/requests.service';
import { UsersService } from 'src/users/users.service';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UserDeleteService {
  constructor(
    private readonly usersService: UsersService,
    private readonly patientsService: PatientsService,
    private readonly requestsService: RequestsService
  ) {}

  async deleteDoctor(dto: DeleteUserDto) {
    const doctor = await this.usersService.getUserById(dto.userId);
    if (!doctor) throw new BadRequestException('Доктор не найден');

    const patients = await this.patientsService.getDoctorPatients(doctor.id);
    if (patients.length > 0) throw new BadRequestException('У этого доктора есть пациенты');

    await doctor.destroy();
    return { deleted: true };
  }

  async deletePatient(dto: DeleteUserDto) {
    const patient = await this.patientsService.getPatientByUserId(dto.userId);
    if (!patient) throw new BadRequestException('Пациент не найден');

    const patientRequests = await this.requestsService.getByPatient(patient.id);

    for (const request of patientRequests) request.destroy({ force: true });

    await patient.destroy();
    await patient.user.destroy();
    return { deleted: true };
  }
}
