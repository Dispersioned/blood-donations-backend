import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransfersController } from './transfers.controller';
import { Transfer } from './transfers.model';
import { TransfersService } from './transfers.service';

@Module({
  controllers: [TransfersController],
  imports: [SequelizeModule.forFeature([Transfer])],
  providers: [TransfersService],
})
export class TransfersModule {}
