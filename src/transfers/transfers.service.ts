import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { HospitalBloodService } from 'src/hospital-blood/hospital-blood.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { Transfer } from './transfers.model';

@Injectable()
export class TransfersService {
  constructor(
    @InjectModel(Transfer) private readonly transferRepository: typeof Transfer,
    private readonly hospitalBloodService: HospitalBloodService
  ) {}

  async createTransfer(dto: CreateTransferDto) {
    const transfer = await this.transferRepository.create(dto);
    return transfer;
  }

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
