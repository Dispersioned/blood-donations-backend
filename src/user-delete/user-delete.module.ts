import { Module } from '@nestjs/common';
import { PatientsModule } from 'src/patients/patients.module';
import { RequestsModule } from 'src/requests/requests.module';
import { UsersModule } from 'src/users/users.module';
import { UserDeleteController } from './user-delete.controller';
import { UserDeleteService } from './user-delete.service';

@Module({
  controllers: [UserDeleteController],
  providers: [UserDeleteService],
  imports: [PatientsModule, UsersModule, RequestsModule],
  exports: [UserDeleteService],
})
export class UserDeleteModule {}
