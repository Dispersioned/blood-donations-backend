import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PatientsService } from 'src/patients/patients.service';
import { createRequestDto } from './dto/create-request.dto';
import { Request } from './requests.model';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(Request) private readonly requestRepository: typeof Request,
    private readonly patientService: PatientsService
  ) {}

  async createRequest(dto: createRequestDto) {
    const patient = await this.patientService.getPatientById(dto.patientId);

    if (!patient) throw new BadRequestException('Пациент не найден');

    const request = await this.requestRepository.create({
      patientId: patient.id,
      bloodId: patient.user.blood.id,
      volume: dto.volume,
      status: 'PENDING',
    });
    return request;
  }

  async getById(id: number) {
    const request = await this.requestRepository.findOne({
      where: { id },
    });
    return request;
  }

  async getAllRequests() {
    const request = await this.requestRepository.findAll();
    return request;
  }
}
