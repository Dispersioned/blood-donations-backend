import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { BloodService } from 'src/blood/blood.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class InitService {
  constructor(
    private readonly bloodService: BloodService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}
  async init() {
    await this.bloodService.createAllBloods();
    const admin = await this.usersService.getUserByName('admin');
    if (!admin)
      await this.authService.registerAdmin({
        blood: {
          group: 'AB',
          rhFactor: '+',
        },
        username: 'admin',
        password: 'admin',
      });
    const doctor = await this.usersService.getUserByName('doc');
    if (!doctor)
      await this.authService.registerDoctor({
        blood: {
          group: 'A',
          rhFactor: '-',
        },
        username: 'doc',
        password: 'doc',
      });
    const donor = await this.usersService.getUserByName('donor');
    if (!donor)
      await this.authService.registerDonor({
        blood: {
          group: 'B',
          rhFactor: '+',
        },
        username: 'donor',
        password: 'donor',
      });
    return;
  }
}
