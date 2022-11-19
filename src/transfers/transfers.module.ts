import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HospitalBloodModule } from 'src/hospital-blood/hospital-blood.module';
import { RequestsModule } from 'src/requests/requests.module';
import { TransfersController } from './transfers.controller';
import { Transfer } from './transfers.model';
import { TransfersService } from './transfers.service';

@Module({
  controllers: [TransfersController],
  imports: [SequelizeModule.forFeature([Transfer]), RequestsModule, HospitalBloodModule],
  providers: [TransfersService],
  exports: [TransfersService],
})
export class TransfersModule {}
