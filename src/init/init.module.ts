import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { BloodModule } from 'src/blood/blood.module';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';
import { InitController } from './init.controller';
import { InitService } from './init.service';

@Module({
  controllers: [InitController],
  providers: [InitService],
  imports: [BloodModule, AuthModule, UsersModule, RolesModule],
})
export class InitModule {}
