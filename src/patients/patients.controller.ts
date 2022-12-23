import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  getAllPatients() {
    return this.patientsService.getAllPatients();
  }

  @Get(':patientId')
  getPatient(@Param('patientId') id) {
    return this.patientsService.getPatientByUserId(+id);
  }

  @Put()
  async updatePatient(@Body() dto: UpdatePatientDto) {
    return this.patientsService.updatePatient(dto);
  }
}
