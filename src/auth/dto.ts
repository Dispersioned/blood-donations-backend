import { createBloodDto } from 'src/blood/dto/create-blood.dto';
import { createPatientDto } from 'src/patients/dto/create-patient.dto';

export class loginUserDto {
  readonly username: string;
  readonly password: string;
}

export class validateUserDto {
  readonly username: string;
  readonly password: string;
}

export class registerUserDto {
  readonly username: string;
  readonly password: string;
  readonly blood: createBloodDto;
}

export class registerPatientDto {
  readonly username: string;
  readonly password: string;
  readonly blood: createBloodDto;
  readonly hospitalId: number;
  readonly doctorId: number;
}
