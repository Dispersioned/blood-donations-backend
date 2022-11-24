import { BadRequestException, Injectable } from '@nestjs/common';
import { Blood } from 'src/blood/blood.model';
import { HospitalBloodService } from 'src/hospital-blood/hospital-blood.service';
import { Patient } from 'src/patients/patients.model';
import { RequestsService } from 'src/requests/requests.service';
import { TransfersService } from 'src/transfers/transfers.service';
import { confirmRequestDto } from './dto/confirm-request.dto';

@Injectable()
export class RequestConfirmerService {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly transfersService: TransfersService,
    private readonly hospitalBloodService: HospitalBloodService
  ) {}

  async confirmRequest(dto: confirmRequestDto) {
    const request = await this.requestsService.getById(dto.requestId, [Patient, Blood]);
    if (!request) throw new BadRequestException('Запрос на переливание не найден');

    const hospitalBlood = await this.hospitalBloodService.getExact(request.patient.hospital.id, request.blood.id);
    if (!hospitalBlood) throw new BadRequestException('Кровь в больнице не найдена');

    request.set('status', 'FULFILLED');
    request.save();
    const transfer = await this.transfersService.create({
      requestId: dto.requestId,
      hospitalBloodId: hospitalBlood.id,
      volume: request.volume,
    });

    return transfer;
  }
}
