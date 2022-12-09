import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { HospitalsService } from 'src/hospitals/hospitals.service';
import { PatientsService } from 'src/patients/patients.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { loginUserDto, meDto, registerPatientDto, registerUserDto, validateUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly patientsService: PatientsService,
    private readonly hospitalsService: HospitalsService
  ) {}

  async login(dto: loginUserDto) {
    const user = await this.validateUser(dto);
    if (!user) throw new BadRequestException('Пользователь не найден');
    const { token } = await this.generateToken(user);

    return {
      user,
      token,
    };
  }

  async me(dto: meDto) {
    const user = await this.validateUserByToken(dto.token);
    if (!user) throw new BadRequestException('Пользователь не найден');
    return {
      user,
    };
  }

  async registerDonor(dto: registerUserDto) {
    const user = await this.register({ ...dto, role: 'DONOR' });
    const { token } = await this.generateToken(user);

    return {
      user,
      token,
    };
  }

  async registerDoctor(dto: registerUserDto) {
    const user = await this.register({ ...dto, role: 'DOCTOR' });
    const { token } = await this.generateToken(user);

    return {
      user,
      token,
    };
  }

  async registerAdmin(dto: registerUserDto) {
    const user = await this.register({ ...dto, role: 'ADMIN' });
    const { token } = await this.generateToken(user);

    return {
      user,
      token,
    };
  }

  async registerPatient(dto: registerPatientDto) {
    const hospital = await this.hospitalsService.getById(dto.hospitalId);
    if (!hospital) throw new BadRequestException('Больница не найдена');

    const doctor = await this.usersService.getUserById(dto.doctorId);
    if (!doctor) {
      throw new BadRequestException('Доктор не найден');
    }
    if (doctor.role.value !== 'DOCTOR') {
      throw new BadRequestException('Доктор недействителен');
    }

    const user = await this.register({ ...dto, role: 'PATIENT' });
    await this.patientsService.createPatient({
      userId: user.id,
      hospitalId: dto.hospitalId,
      doctorId: dto.doctorId,
    });
    const { token } = await this.generateToken(user);

    return {
      user,
      token,
    };
  }

  private async register(dto: CreateUserDto) {
    const candidate = await this.usersService.getUserByNameWithPassword(dto.username);
    if (candidate) {
      throw new BadRequestException('Пользователь с таким именем уже существует');
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersService.createUser({ ...dto, password: hashPassword });

    return user;
  }

  private async validateUserByToken(token: string) {
    const user = await this.validateToken(token);
    if (!user) throw new UnauthorizedException('Пользователь не найден');

    const serializedUser = await this.usersService.getUserById(user.id);
    return serializedUser;
  }

  private async generateToken(user: User) {
    const payload = { username: user.username, id: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: validateUserDto) {
    const user = await this.usersService.getUserByNameWithPassword(userDto.username);
    if (!user) throw new UnauthorizedException('Пользователь не найден');

    const password = await this.usersService.getUserPassword(user.id);

    const passwordEquals = await bcrypt.compare(userDto.password, password);
    if (!passwordEquals) throw new UnauthorizedException('Неправильный логин или пароль');
    return user;
  }

  async validateToken(token: string) {
    try {
      const user = this.jwtService.verify(token);
      return user;
    } catch (err) {
      return null;
    }
  }
}
