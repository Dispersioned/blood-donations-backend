import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/role-auth.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() userDto: createUserDto) {
  //   return this.usersService.createDonor(userDto);
  // }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }
}
