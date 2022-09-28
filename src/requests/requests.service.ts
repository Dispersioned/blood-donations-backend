import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createRequestDto } from './dto/create-request.dto';
import { Request } from './requests.model';

@Injectable()
export class RequestsService {
  constructor(@InjectModel(Request) private readonly requestRepository: typeof Request) {}

  async createRequest(dto: createRequestDto) {
    const request = await this.requestRepository.create({ ...dto, status: 'pending' });
    await request.$set('patient', dto.patientId);
    await request.$set('blood', dto.bloodId);
    return request;
  }
}
