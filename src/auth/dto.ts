import { createBloodDto } from 'src/blood/dto/create-blood.dto';
import { IRoleName } from 'src/roles/roles.model';

export class loginUserDto {
  readonly username: string;
  readonly password: string;
}

export class validateUserDto extends loginUserDto {}

export class registerUserDto extends loginUserDto {
  readonly blood: createBloodDto;
}

export class registerPatientDto extends registerUserDto {
  readonly hospitalId: number;
  readonly doctorId: number;
}

export class registerPatientByDto extends registerPatientDto {
  readonly creatorRole: IRoleName;
}
