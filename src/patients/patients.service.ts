import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from './patients.model';

@Injectable()
export class PatientsService {
  constructor(@InjectModel(Patient) private readonly patientsRepository: typeof Patient) {}

  // async createPatient(dto: createPatientDto) {
  //   // const user = await this.authService.verifyToken(token);
  //   // if (!user) const role = await this.usersService.getUserRole(user.id);
  //   // console.log(user, role);
  //   // const patient = await this.patientsRepository.create(dto);
  //   // await patient.$set('user', dto.userId);
  //   // await patient.$set('hospital', dto.hospitalId);
  //   // return patient;
  // }
}
