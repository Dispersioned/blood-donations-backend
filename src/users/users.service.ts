import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { createUserDto } from './dto/create-user-dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: typeof User,
    private readonly roleService: RolesService
  ) {}

  async createUser(dto: createUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('role', role.id);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      include: {
        model: Role,
        attributes: ['value'],
      },
      attributes: {
        exclude: ['roleId', 'createdAt', 'updatedAt'],
      },
    });
    return users;
  }
}
