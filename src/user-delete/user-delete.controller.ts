import { Body, Controller, Delete } from '@nestjs/common';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UserDeleteService } from './user-delete.service';

@Controller('user-delete')
export class UserDeleteController {
  constructor(private readonly userDeleteService: UserDeleteService) {}

  @Delete('doctor')
  deleteDoctor(@Body() dto: DeleteUserDto) {
    return this.userDeleteService.deleteDoctor(dto);
  }

  @Delete('patient')
  deletePatient(@Body() dto: DeleteUserDto) {
    this.userDeleteService.deletePatient(dto);
  }
}
