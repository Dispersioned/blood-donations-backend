import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { bloodGroup } from './bloodGroup.model';

@Injectable()
export class BloodGroupService {
  constructor(@InjectModel(bloodGroup) private readonly bloodGroupRepository: typeof bloodGroup) {}

  async getAll() {
    const bloods = await this.bloodGroupRepository.findAll();
    return bloods;
  }

  async createAll() {
    await this.bloodGroupRepository.create({ name: '' });
    await this.bloodGroupRepository.create({ name: 'A' });
    await this.bloodGroupRepository.create({ name: 'B' });
    await this.bloodGroupRepository.create({ name: 'AB' });
    const bloodGroups = await this.getAll();
    return bloodGroups;
  }
}
