import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { DeleteHospitalDto } from './dto/delete-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
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

  @Put()
  async updateHospital(@Body() dto: UpdateHospitalDto) {
    return this.hospitalsService.updateHospital(dto);
  }

  @Delete()
  async deleteHospital(@Body() dto: DeleteHospitalDto) {
    return this.hospitalsService.deleteHospital(dto);
  }
}
