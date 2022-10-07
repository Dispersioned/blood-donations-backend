import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BloodService } from 'src/blood/blood.service';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { createUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: typeof User,
    private readonly roleService: RolesService,
    private readonly bloodService: BloodService
  ) {}

  async createUser(dto: createUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue(dto.role);
    await user.$set('role', role.id);
    const blood = await this.bloodService.getBloodByValue(dto.blood);
    await user.$set('blood', blood.id);
    // needed to pass role & blood info in JWT token
    user.role = role;
    user.blood = blood;
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      include: {
        model: Role,
      },
    });
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      include: {
        model: Role,
      },
      where: {
        id,
      },
    });
    return user;
  }

  async getUserPassword(userId: number) {
    const user = await this.userRepository.scope('withPassword').findOne({
      where: {
        id: userId,
      },
    });
    return user.password;
  }

  async getUserByName(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      include: {
        model: Role,
      },
    });
    return user;
  }

  async getUserRole(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    return user.role;
  }
}
