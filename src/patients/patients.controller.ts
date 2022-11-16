import { Controller, Get } from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  async getAllPatients() {
    const patients = await this.patientsService.getAllPatients();
    return patients;
  }
}
