import { Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Post()
  create() {
    return this.roleService.createAllRoles();
  }

  @Get(':value')
  getByValue(@Param() value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
