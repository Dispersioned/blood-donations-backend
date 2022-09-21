import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BloodGroup } from './blood-group.model';

@Injectable()
export class BloodGroupService {
  constructor(@InjectModel(BloodGroup) private readonly bloodGroupRepository: typeof BloodGroup) {}

  async getAll() {
    const bloods = await this.bloodGroupRepository.findAll();
    return bloods;
  }

  async createAll() {
    await this.bloodGroupRepository.create({ value: '' });
    await this.bloodGroupRepository.create({ value: 'A' });
    await this.bloodGroupRepository.create({ value: 'B' });
    await this.bloodGroupRepository.create({ value: 'AB' });
    const bloodGroups = await this.getAll();
    return bloodGroups;
  }
}
