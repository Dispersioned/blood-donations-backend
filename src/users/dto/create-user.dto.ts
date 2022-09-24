import { createBloodDto } from 'src/blood/dto/create-blood.dto';

export class createUserDto {
  readonly username: string;
  readonly password: string;
  readonly blood: createBloodDto;
}
