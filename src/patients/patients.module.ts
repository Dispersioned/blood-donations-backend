import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatientsController } from './patients.controller';
import { Patient } from './patients.model';
import { PatientsService } from './patients.service';

@Module({
  providers: [PatientsService],
  imports: [SequelizeModule.forFeature([Patient])],
  controllers: [PatientsController],
  exports: [PatientsService],
})
export class PatientsModule {}
