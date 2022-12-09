import { Body, Controller, Get, Put } from '@nestjs/common';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  @Get('doctors')
  async getAllDoctors() {
    const users = await this.usersService.getAllUsersByRole('DOCTOR');
    return users;
  }

  @Put('doctor')
  async updateDoctor(@Body() dto: UpdateDoctorDto) {
    return this.usersService.updateDoctor(dto);
  }
}
