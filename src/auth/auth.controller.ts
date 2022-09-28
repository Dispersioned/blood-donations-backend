import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { registerPatientDto, registerUserDto } from './dto';
import { Roles } from './role-auth.decorator';
import { RolesGuard } from './role.guard';
import { Token } from './token.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

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
  async registerPatient(@Body() dto: registerPatientDto, @Token() token: string) {
    const user = await this.jwtService.verify(token);
    return this.authService.registerPatient({ ...dto, creatorRole: user.role.value });
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
