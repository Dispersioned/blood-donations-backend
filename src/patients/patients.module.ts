import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { PatientsController } from './patients.controller';
import { Patient } from './patients.model';
import { PatientsService } from './patients.service';

@Module({
  providers: [PatientsService],
  controllers: [PatientsController],
  imports: [SequelizeModule.forFeature([Patient]), UsersModule],
  exports: [PatientsService],
})
export class PatientsModule {}
