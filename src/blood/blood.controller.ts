import { Controller, Get, Post } from '@nestjs/common';
import { BloodService } from './blood.service';

@Controller('blood')
export class BloodController {
  constructor(private readonly bloodService: BloodService) {}

  @Get()
  getAllBlood() {
    return this.bloodService.getAll();
  }

  @Post()
  createAllBloods() {
    return this.bloodService.createAllBloods();
  }
}
