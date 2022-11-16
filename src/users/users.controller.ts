import { Controller, Get } from '@nestjs/common';
import sanitizeUser from 'src/utils/sanitizeUser';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Get()
  async getAll() {
    const users = await this.usersService.getAllUsers();
    return users.map(sanitizeUser);
  }

  @Get('doctors')
  async getAllDoctors() {
    const users = await this.usersService.getAllUsersByRole('DOCTOR');
    return users.map(sanitizeUser);
  }

  @Get('patients')
  async getAllPatients() {
    const users = await this.usersService.getAllUsersByRole('PATIENT');
    return users.map(sanitizeUser);
  }
}
