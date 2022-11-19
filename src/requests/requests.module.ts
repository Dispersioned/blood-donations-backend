import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatientsModule } from 'src/patients/patients.module';
import { RequestsController } from './requests.controller';
import { Request } from './requests.model';
import { RequestsService } from './requests.service';

@Module({
  providers: [RequestsService],
  imports: [SequelizeModule.forFeature([Request]), PatientsModule],
  controllers: [RequestsController],
  exports: [RequestsService],
})
export class RequestsModule {}
