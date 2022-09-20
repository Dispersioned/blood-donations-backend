import { Controller, Get, Post } from '@nestjs/common';
import { BloodGroupService } from './bloodGroup.service';

@Controller('blood-group')
export class BloodGroupController {
  constructor(private readonly bloodGroupService: BloodGroupService) {}

  @Get()
  getAllBloodGroups() {
    return this.bloodGroupService.getAll();
  }

  @Post()
  createAllBloodGroups() {
    return this.bloodGroupService.createAll();
  }
}
