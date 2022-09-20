import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BloodController } from './blood.controller';
import { Blood } from './blood.model';
import { BloodService } from './blood.service';

@Module({
  controllers: [BloodController],
  providers: [BloodService],
  imports: [SequelizeModule.forFeature([Blood])],
  exports: [BloodService],
})
export class BloodModule {}
