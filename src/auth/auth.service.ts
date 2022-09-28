import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { loginUserDto, registerPatientDto, registerUserDto, validateUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async login(dto: loginUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  // TODO: requires extra bl when other modules done
  async registerDonor(dto: registerUserDto) {
    const user = await this.register({ ...dto, role: 'DONOR' });
    return user;
  }

  async registerDoctor(dto: registerUserDto) {
    const user = await this.register({ ...dto, role: 'DOCTOR' });
    return user;
  }

  async registerAdmin(dto: registerUserDto) {
    const user = await this.register({ ...dto, role: 'ADMIN' });
    return user;
  }

  async registerPatient(dto: registerPatientDto) {
    console.log('new patient dto', dto);
    // const user = await this.register({ ...dto, role: 'PATIENT' });

    // await this.patientsService.createPatient({
    //   userId: user.id,
    //   doctorId: dto.doctorId,
    //   hospitalId: dto.hospitalId,
    // });
    // return user;
  }

  private async register(dto: createUserDto) {
    const candidate = await this.usersService.getUserByUsername(dto.username);
    if (candidate) {
      throw new BadRequestException('Пользователь с таким именем уже существует');
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersService.createUser({ ...dto, password: hashPassword });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { username: user.username, id: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: validateUserDto) {
    const user = await this.usersService.getUserByUsername(userDto.username);
    if (!user) throw new UnauthorizedException('Пользователь не найден');

    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (!passwordEquals) throw new UnauthorizedException('Неправильный логин или пароль');
    return user;
  }

  async verifyToken(token: string) {
    try {
      const user = this.jwtService.verify(token);
      return user;
    } catch (err) {
      return null;
    }
  }
}
