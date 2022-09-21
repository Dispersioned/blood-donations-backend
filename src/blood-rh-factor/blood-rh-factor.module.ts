import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BloodRhFactorController } from './blood-rh-factor.controller';
import { BloodRhFactor } from './blood-rh-factor.model';
import { BloodRhFactorService } from './blood-rh-factor.service';

@Module({
  controllers: [BloodRhFactorController],
  providers: [BloodRhFactorService],
  imports: [SequelizeModule.forFeature([BloodRhFactor])],
  exports: [BloodRhFactorService],
})
export class BloodRhFactorModule {}
