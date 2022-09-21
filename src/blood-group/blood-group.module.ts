import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BloodGroupController } from './blood-group.controller';
import { BloodGroup } from './blood-group.model';
import { BloodGroupService } from './blood-group.service';

@Module({
  controllers: [BloodGroupController],
  providers: [BloodGroupService],
  imports: [SequelizeModule.forFeature([BloodGroup])],
  exports: [BloodGroupService],
})
export class BloodGroupModule {}
