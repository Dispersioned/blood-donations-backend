import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BloodGroupController } from './bloodGroup.controller';
import { BloodGroup } from './bloodGroup.model';
import { BloodGroupService } from './bloodGroup.service';

@Module({
  controllers: [BloodGroupController],
  providers: [BloodGroupService],
  imports: [SequelizeModule.forFeature([BloodGroup])],
  exports: [BloodGroupService],
})
export class BloodGroupModule {}
