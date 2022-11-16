import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import sanitizeUser from 'src/utils/sanitizeUser';
import { AuthService } from './auth.service';
import { loginUserDto, meDto, registerPatientDto, registerUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  @Post('me')
  async me(@Body() dto: meDto) {
    const data = await this.authService.me(dto);
    return {
      user: sanitizeUser(data.user),
    };
  }

  @Post('login')
  async login(@Body() dto: loginUserDto) {
    const data = await this.authService.login(dto);
    return {
      token: data.token,
      user: sanitizeUser(data.user),
    };
  }

  @Post('register')
  async registerDonor(@Body() dto: registerUserDto) {
    const data = await this.authService.registerDonor(dto);
    return {
      token: data.token,
      user: sanitizeUser(data.user),
    };
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
    const data = await this.authService.registerPatient(dto);
    return {
      token: data.token,
      user: sanitizeUser(data.user),
    };
  }

  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Post('register-doctor')
  async registerDoctor(@Body() dto: registerUserDto) {
    const data = await this.authService.registerDoctor(dto);
    return {
      token: data.token,
      user: sanitizeUser(data.user),
    };
  }

  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Post('register-admin')
  async registerAdmin(@Body() dto: registerUserDto) {
    const data = await this.authService.registerAdmin(dto);
    return {
      token: data.token,
      user: sanitizeUser(data.user),
    };
  }
}
