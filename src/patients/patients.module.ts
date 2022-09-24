import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from './patients.model';

@Module({
  providers: [PatientsService],
  imports: [SequelizeModule.forFeature([Patient])],
  controllers: [PatientsController],
})
export class PatientsModule {}
