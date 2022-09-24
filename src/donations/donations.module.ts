import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BloodModule } from 'src/blood/blood.module';
import { HospitalBloodModule } from 'src/hospital-blood/hospital-blood.module';
import { HospitalsModule } from 'src/hospitals/hospitals.module';
import { UsersModule } from 'src/users/users.module';
import { DonationsController } from './donations.controller';
import { Donation } from './donations.model';
import { DonationsService } from './donations.service';

@Module({
  providers: [DonationsService],
  imports: [SequelizeModule.forFeature([Donation]), UsersModule, BloodModule, HospitalsModule, HospitalBloodModule],
  controllers: [DonationsController],
})
export class DonationsModule {}
