import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDto } from './dto';
import { Roles } from './role-auth.decorator';
import { RolesGuard } from './role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: registerUserDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  registerDonor(@Body() dto: registerUserDto) {
    return this.authService.registerDonor(dto);
  }

  @Roles('ADMIN', 'DOCTOR')
  @UseGuards(RolesGuard)
  @Post('register-patient')
  registerPatient(@Body() dto: registerUserDto) {
    return this.authService.registerPatient(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('register-doctor')
  registerDoctor(@Body() dto: registerUserDto) {
    return this.authService.registerDoctor(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('register-admin')
  registerAdmin(@Body() dto: registerUserDto) {
    return this.authService.registerAdmin(dto);
  }
}
