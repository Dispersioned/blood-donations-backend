import { createBloodDto } from 'src/blood/dto/create-blood.dto';
import { IRoleName } from 'src/roles/roles.model';

export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly blood: createBloodDto;
  readonly role: IRoleName;
}
