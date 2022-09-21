import { Controller, Get, Post } from '@nestjs/common';
import { BloodRhFactorService } from './blood-rh-factor.service';

@Controller('blood-rh-factor')
export class BloodRhFactorController {
  constructor(private readonly bloodRhFactorService: BloodRhFactorService) {}

  @Get()
  getAllBloodRhFactors() {
    return this.bloodRhFactorService.getAll();
  }

  @Post()
  createAllBloodRhFactors() {
    return this.bloodRhFactorService.createAll();
  }
}
