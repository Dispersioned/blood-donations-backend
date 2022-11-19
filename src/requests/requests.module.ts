import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DonationsModule } from 'src/donations/donations.module';
import { HospitalBloodModule } from 'src/hospital-blood/hospital-blood.module';
import { PatientsModule } from 'src/patients/patients.module';
import { TransfersModule } from 'src/transfers/transfers.module';
import { RequestsController } from './requests.controller';
import { Request } from './requests.model';
import { RequestsService } from './requests.service';

@Module({
  providers: [RequestsService],
  imports: [
    SequelizeModule.forFeature([Request]),
    PatientsModule,
    HospitalBloodModule,
    DonationsModule,
    TransfersModule,
  ],
  controllers: [RequestsController],
  exports: [RequestsService],
})
export class RequestsModule {}
