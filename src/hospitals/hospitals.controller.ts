import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { HospitalsService } from './hospitals.service';

@Controller('hospitals')
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Get()
  async getAllHospitals() {
    const hospitals = await this.hospitalsService.getAll();
    return hospitals;
  }

  // TODO: for admin only
  @Post()
  async create(@Body() dto: CreateHospitalDto) {
    const hospital = await this.hospitalsService.createHospital(dto);
    return hospital;
  }
}
