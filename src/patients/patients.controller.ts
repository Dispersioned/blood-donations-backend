import { Controller, Get, Param } from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  getAllPatients() {
    return this.patientsService.getAllPatients();
  }

  @Get(':patientId')
  getPatientInfo(@Param('patientId') id) {
    return this.patientsService.getPatientInfo(id);
  }
}
