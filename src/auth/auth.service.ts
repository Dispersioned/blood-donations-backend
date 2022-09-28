import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { HospitalsService } from 'src/hospitals/hospitals.service';
import { PatientsService } from 'src/patients/patients.service';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { loginUserDto, registerPatientByDto, registerUserDto, validateUserDto } from './dto';

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
    return this.generateToken(user);
  }

  // TODO: requires extra bl when other modules done
  //? Maybe it should return both user and token

  async registerDonor(dto: registerUserDto) {
    const user = await this.register({ ...dto, role: 'DONOR' });
    return this.generateToken(user);
  }

  async registerDoctor(dto: registerUserDto) {
    const user = await this.register({ ...dto, role: 'DOCTOR' });
    return this.generateToken(user);
  }

  async registerAdmin(dto: registerUserDto) {
    const user = await this.register({ ...dto, role: 'ADMIN' });
    return this.generateToken(user);
  }

  async registerPatient(dto: registerPatientByDto) {
    const hospital = await this.hospitalsService.getById(dto.hospitalId);
    if (!hospital) throw new BadRequestException('Больница не найдена');

    const doctor = await this.usersService.getUserById(dto.creator.id);
    if (!doctor) throw new BadRequestException('Доктор не найден');
    if (doctor.role.value !== 'DOCTOR') throw new BadRequestException('Куратор больного не является доктором');
    if (doctor.id !== dto.doctorId)
      throw new BadRequestException('Доктор не может назначить куратором больного другого доктора');

    const user = await this.register({ ...dto, role: 'PATIENT' });
    await this.patientsService.createPatient({
      userId: user.id,
      doctorId: dto.doctorId,
      hospitalId: dto.hospitalId,
    });
    return user;
  }

  private async register(dto: createUserDto) {
    const candidate = await this.usersService.getUserByUsername(dto.username);
    if (candidate) {
      throw new BadRequestException('Пользователь с таким именем уже существует');
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersService.createUser({ ...dto, password: hashPassword });

    return user;
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

  async validateToken(token: string) {
    try {
      const user = this.jwtService.verify(token);
      return user;
    } catch (err) {
      return null;
    }
  }
}
