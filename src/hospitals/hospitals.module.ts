import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HospitalBloodModule } from 'src/hospital-blood/hospital-blood.module';
import { HospitalsController } from './hospitals.controller';
import { Hospital } from './hospitals.model';
import { HospitalsService } from './hospitals.service';

@Module({
  controllers: [HospitalsController],
  imports: [SequelizeModule.forFeature([Hospital]), HospitalBloodModule],
  providers: [HospitalsService],
  exports: [HospitalsService],
})
export class HospitalsModule {}
