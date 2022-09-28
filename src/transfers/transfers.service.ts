import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HospitalBloodService } from 'src/hospital-blood/hospital-blood.service';
import { RequestsService } from 'src/requests/requests.service';
import { createTransferDto } from './dto/create-transfer.dto';
import { Transfer } from './transfers.model';

@Injectable()
export class TransfersService {
  constructor(
    @InjectModel(Transfer) private readonly transferRepository: typeof Transfer,
    private readonly requestsService: RequestsService,
    private readonly hospitalBloodService: HospitalBloodService
  ) {}

  async createTransfer(dto: createTransferDto) {
    const request = await this.requestsService.findById(dto.requestId);
    if (!request) throw new BadRequestException('Запрос крови не найден');

    const hospitalBlood = await this.hospitalBloodService.findById(dto.hospitalBloodId);
    if (!hospitalBlood) throw new BadRequestException('Банк крови не найден');

    const transfer = await this.transferRepository.create(dto);
    await transfer.$set('request', request.id);
    await transfer.$set('hospitalBlood', hospitalBlood.id);
    return transfer;
  }
}
