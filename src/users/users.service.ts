import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BloodService } from 'src/blood/blood.service';
import { IRoleName, Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: typeof User,
    private readonly roleService: RolesService,
    private readonly bloodService: BloodService
  ) {}

  async updateDoctor(dto: UpdateDoctorDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) throw new BadRequestException('Доктор не найден');
    user.set('username', dto.username);
    user.save();
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const role = await this.roleService.getRoleByValue(dto.role);
    const blood = await this.bloodService.getBloodByValue(dto.blood);
    const user = await this.userRepository.create(dto);
    await user.$set('role', role.id);
    await user.$set('blood', blood.id);
    //* needed to pass role & blood info in JWT token
    user.role = role;
    user.blood = blood;
    //* needed to include associated by IDs values in plain js user
    user.setDataValue('role', role);
    user.setDataValue('blood', blood);

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getAllUsersByRole(role: IRoleName) {
    const users = await this.userRepository.findAll({
      include: {
        model: Role,
        where: {
          value: role,
        },
      },
    });
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  async getUserByName(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    return user;
  }

  async getUserByNameWithPassword(username: string) {
    const user = await this.userRepository.scope('withPassword').findOne({
      where: { username },
    });

    return user;
  }

  async getUserRole(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    return user.role;
  }

  async getUserPassword(userId: number) {
    const user = await this.userRepository.scope('withPassword').findOne({
      where: {
        id: userId,
      },
    });
    return user.password;
  }
}
