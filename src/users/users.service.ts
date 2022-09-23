import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BloodService } from 'src/blood/blood.service';
import { createRoleDto } from 'src/roles/dto/create-role-dto';
import { IRoleName, Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { createAnyDto } from './dto/create-any-dto';
import { createUserDto } from './dto/create-user-dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: typeof User,
    private readonly roleService: RolesService,
    private readonly bloodService: BloodService
  ) {}

  // TODO: requires extra bl when other modules done
  async createDonor(dto: createUserDto) {
    const user = await this.createAny({ ...dto, role: 'DONOR' });
    return user;
  }
  async createDoctor(dto: createUserDto) {
    const user = await this.createAny({ ...dto, role: 'DOCTOR' });
    return user;
  }
  async createAdmin(dto: createUserDto) {
    const user = await this.createAny({ ...dto, role: 'ADMIN' });
    return user;
  }
  // TODO: create Patient module first
  // async createPatient(dto: createUserDto) {
  //   const user = await this.createAny({ ...dto, role: 'PATIENT' });
  //   return user;
  // }

  private async createAny(dto: createAnyDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue(dto.role);
    await user.$set('role', role.id);
    // return user with role, because $set doesn't mutate initial data
    user.role = role;
    const blood = await this.bloodService.getBloodByValue(dto.blood);
    await user.$set('blood', blood.id);
    user.blood = blood;
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      include: {
        model: Role,
      },
      attributes: {
        exclude: ['password'],
      },
    });
    return users;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      include: { all: true },
    });
    return user;
  }
}
