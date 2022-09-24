import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userDto: createUserDto) {
    return this.authService.login(userDto);
  }

  @Post('register')
  register(@Body() userDto: createUserDto) {
    return this.authService.register(userDto);
  }
}
