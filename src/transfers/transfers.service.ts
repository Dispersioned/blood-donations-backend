import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HospitalBloodService } from 'src/hospital-blood/hospital-blood.service';
import { Transfer } from './transfers.model';

@Injectable()
export class TransfersService {
  constructor(
    @InjectModel(Transfer) private readonly transferRepository: typeof Transfer,
    // private readonly requestsService: RequestsService,
    private readonly hospitalBloodService: HospitalBloodService
  ) {}

  // async createTransfer(dto: createTransferDto) {
  //   const request = await this.requestsService.getById(dto.requestId);
  //   if (!request) throw new BadRequestException('Запрос на переливание не найден');

  //   const hospitalBlood = await this.hospitalBloodService.getById(dto.hospitalBloodId);
  //   if (!hospitalBlood) throw new BadRequestException('Кровь в больнице не найдена');

  //   const transfer = await this.transferRepository.create(dto);
  //   //? not needed
  //   // await transfer.$set('request', request.id);
  //   // await transfer.$set('hospitalBlood', hospitalBlood.id);
  //   return transfer;
  // }

  async getBloodVolume({ hospitalBloodId }: { hospitalBloodId: number }) {
    const volume = await this.transferRepository.findAll({
      where: {
        hospitalBloodId,
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('volume')), 'volume']],
      raw: true,
    });
    return volume[0].volume;
  }
}
