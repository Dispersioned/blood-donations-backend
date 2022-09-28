import { createBloodDto } from 'src/blood/dto/create-blood.dto';

export class registerUserDto {
  readonly username: string;
  readonly password: string;
  readonly blood: createBloodDto;
}
