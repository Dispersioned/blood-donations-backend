import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { loginUserDto, meDto, registerPatientDto, registerUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  @Post('me')
  async me(@Body() dto: meDto) {
    return this.authService.me(dto);
  }

  @Post('login')
  async login(@Body() dto: loginUserDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  async registerDonor(@Body() dto: registerUserDto) {
    return this.authService.registerDonor(dto);
  }

  // @Roles('ADMIN', 'DOCTOR')
  // @UseGuards(RolesGuard)
  //? пока пусть и доктор и админ могут регистрировать пациента с любым лечащим доктором
  // @Post('register-patient')
  // async registerPatient(@Body() dto: registerPatientDto, @Token() token: string) {
  //   const user = await this.jwtService.verify(token);
  //   return this.authService.registerPatient({ ...dto, creator: user });
  // }
  @Post('register-patient')
  async registerPatient(@Body() dto: registerPatientDto) {
    return this.authService.registerPatient(dto);
  }

  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Post('register-doctor')
  async registerDoctor(@Body() dto: registerUserDto) {
    return this.authService.registerDoctor(dto);
  }

  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Post('register-admin')
  async registerAdmin(@Body() dto: registerUserDto) {
    return this.authService.registerAdmin(dto);
  }
}
