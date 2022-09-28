import { IBloodGroup, IBloodRhFactor } from '../blood.model';

export class createBloodDto {
  readonly group: IBloodGroup;
  readonly rhFactor: IBloodRhFactor;
}
