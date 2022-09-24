import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transfer } from './transfers.model';

@Injectable()
export class TransfersService {
  // constructor(@InjectModel(Transfer) private readonly transferRepository: typeof Transfer) {}
}
