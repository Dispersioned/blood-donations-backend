import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HospitalBloodModule } from 'src/hospital-blood/hospital-blood.module';
import { PatientsModule } from 'src/patients/patients.module';
import { RequestsController } from './requests.controller';
import { Request } from './requests.model';
import { RequestsService } from './requests.service';

@Module({
  providers: [RequestsService],
  imports: [SequelizeModule.forFeature([Request]), PatientsModule, HospitalBloodModule],
  controllers: [RequestsController],
  exports: [RequestsService],
})
export class RequestsModule {}
