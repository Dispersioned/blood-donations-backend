import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async login(userDto: createUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(userDto: createUserDto) {
    const candidate = await this.usersService.getUserByUsername(userDto.username);
    if (candidate) {
      throw new HttpException('Пользователь с таким именем уже существует', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser({ ...userDto, password: hashPassword });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { username: user.username, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: createUserDto) {
    const user = await this.usersService.getUserByUsername(userDto.username);
    if (!user) throw new UnauthorizedException({ message: 'Пользователь не найден' });

    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (!passwordEquals) throw new UnauthorizedException({ message: 'Неправильный логин или пароль' });
    return user;
  }
}
