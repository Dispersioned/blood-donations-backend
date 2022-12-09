import { Body, Controller, Get, Put } from '@nestjs/common';
import { updateUserDto } from './dto/update-user.dto';
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

  @Put()
  async updateUser(@Body() dto: updateUserDto) {
    return this.usersService.updateUser(dto);
  }
}
