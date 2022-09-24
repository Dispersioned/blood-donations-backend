import { Body, Controller, Post } from '@nestjs/common';
import { createPatientDto } from './dto/create-patient.dto';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  createPatient(@Body() dto: createPatientDto) {
    return this.patientsService.createPatient(dto);
  }
}
