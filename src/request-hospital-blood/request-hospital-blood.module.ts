import { Module } from '@nestjs/common';
import { RequestHospitalBloodController } from './request-hospital-blood.controller';
import { RequestHospitalBloodService } from './request-hospital-blood.service';

@Module({
  controllers: [RequestHospitalBloodController],
  providers: [RequestHospitalBloodService]
})
export class RequestHospitalBloodModule {}
