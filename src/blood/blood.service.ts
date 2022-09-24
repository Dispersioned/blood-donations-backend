import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blood } from './blood.model';
import { createBloodDto } from './dto/create-blood.dto';

@Injectable()
export class BloodService {
  constructor(@InjectModel(Blood) private readonly bloodRepository: typeof Blood) {}

  async getAll() {
    const bloods = await this.bloodRepository.findAll();
    return bloods;
  }

  async getBloodByValue(value: createBloodDto) {
    const blood = await this.bloodRepository.findOne({
      where: {
        group: value.group,
        rhFactor: value.rhFactor,
      },
    });
    return blood;
  }

  private async createBlood(dto: createBloodDto) {
    const blood = await this.bloodRepository.create(dto);
    return blood;
  }

  async createAllBloods() {
    await this.createBlood({ group: '', rhFactor: '-' });
    await this.createBlood({ group: '', rhFactor: '+' });
    await this.createBlood({ group: 'A', rhFactor: '-' });
    await this.createBlood({ group: 'A', rhFactor: '+' });
    await this.createBlood({ group: 'B', rhFactor: '-' });
    await this.createBlood({ group: 'B', rhFactor: '+' });
    await this.createBlood({ group: 'AB', rhFactor: '-' });
    await this.createBlood({ group: 'AB', rhFactor: '+' });
    const bloods = await this.getAll();
    return bloods;
  }
}
