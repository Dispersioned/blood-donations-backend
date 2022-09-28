import { createBloodDto } from 'src/blood/dto/create-blood.dto';

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
