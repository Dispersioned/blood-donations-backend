import { Body, Controller, Get, Post } from '@nestjs/common';
import { BloodService } from './blood.service';
import { createBloodDto } from './dto/create-blood-dto';

@Controller('blood')
export class BloodController {
  constructor(private readonly bloodService: BloodService) {}

  @Get()
  getAllBlood() {
    return this.bloodService.getAll();
  }

  @Post()
  create(@Body() bloodDto: createBloodDto) {
    return this.bloodService.createBlood(bloodDto);
  }
}
