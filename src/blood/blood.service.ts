import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blood } from './blood.model';
import { createBloodDto } from './dto/create-blood-dto';

@Injectable()
export class BloodService {
  constructor(@InjectModel(Blood) private readonly bloodRepository: typeof Blood) {}

  async getAll() {
    const bloods = await this.bloodRepository.findAll();
    return bloods;
  }

  private async createBlood(dto: createBloodDto) {
    const blood = await this.bloodRepository.create(dto);
    return blood;
  }

  async createAllBloods() {
    this.createBlood({ group: '', rhFactor: '-' });
    this.createBlood({ group: '', rhFactor: '+' });
    this.createBlood({ group: 'A', rhFactor: '-' });
    this.createBlood({ group: 'A', rhFactor: '+' });
    this.createBlood({ group: 'B', rhFactor: '-' });
    this.createBlood({ group: 'B', rhFactor: '+' });
    this.createBlood({ group: 'AB', rhFactor: '-' });
    this.createBlood({ group: 'AB', rhFactor: '+' });
  }
}
