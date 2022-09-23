import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createRoleDto } from './dto/create-role-dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private readonly roleRepository: typeof Role) {}

  private async createRole(dto: createRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async createAllRoles() {
    await this.createRole({ value: 'DONOR' });
    await this.createRole({ value: 'ADMIN' });
    await this.createRole({ value: 'PATIENT' });
    await this.createRole({ value: 'DOCTOR' });
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }
}
