import { createBloodDto } from 'src/blood/dto/create-blood.dto';
import { IRoleName } from 'src/roles/roles.model';

export class createUserDto {
  readonly username: string;
  readonly password: string;
  readonly blood: createBloodDto;
  readonly role: IRoleName;
}
