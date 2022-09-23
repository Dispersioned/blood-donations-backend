import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BloodModule } from 'src/blood/blood.module';
import { HospitalBloodController } from './hospital-blood.controller';
import { HospitalBlood } from './hospital-blood.model';
import { HospitalBloodService } from './hospital-blood.service';

@Module({
  controllers: [HospitalBloodController],
  imports: [SequelizeModule.forFeature([HospitalBlood]), BloodModule],
  providers: [HospitalBloodService],
  exports: [HospitalBloodService],
})
export class HospitalBloodModule {}
