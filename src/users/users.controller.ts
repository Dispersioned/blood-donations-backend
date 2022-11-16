import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
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
}
