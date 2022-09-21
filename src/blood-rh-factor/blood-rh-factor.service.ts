import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BloodRhFactor } from './blood-rh-factor.model';

@Injectable()
export class BloodRhFactorService {
  constructor(@InjectModel(BloodRhFactor) private readonly bloodRhFactorRepository: typeof BloodRhFactor) {}

  async getAll() {
    const bloodRhFactors = await this.bloodRhFactorRepository.findAll();
    return bloodRhFactors;
  }

  async createAll() {
    await this.bloodRhFactorRepository.create({ value: '+' });
    await this.bloodRhFactorRepository.create({ value: '-' });
    const bloodRhFactors = await this.getAll();
    return bloodRhFactors;
  }
}
