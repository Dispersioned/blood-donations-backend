import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/role-auth.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { createUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('doctor')
  createDoctor(@Body() dto: createUserDto) {
    return this.usersService.createDoctor(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('admin')
  createAdmin(@Body() dto: createUserDto) {
    return this.usersService.createAdmin(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }
}
