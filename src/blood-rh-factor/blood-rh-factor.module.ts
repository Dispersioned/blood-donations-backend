import { Module } from '@nestjs/common';
import { BloodRhFactorService } from './blood-rh-factor.service';

@Module({
  providers: [BloodRhFactorService],
})
export class BloodRhFactorModule {}
