import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HospitalsController } from './hospitals.controller';
import { Hospital } from './hospitals.model';
import { HospitalsService } from './hospitals.service';

@Module({
  controllers: [HospitalsController],
  imports: [SequelizeModule.forFeature([Hospital])],
  providers: [HospitalsService],
})
export class HospitalsModule {}
