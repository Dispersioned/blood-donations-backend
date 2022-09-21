import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { HospitalBlood } from 'src/hospital-blood/hospitals-blood.model';
import { Patient } from 'src/patients/patients.model';

interface HospitalCreationAttrs {
  name: string;
  location: string;
}

@Table({ tableName: 'hospitals' })
export class Hospital extends Model<Hospital, HospitalCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;

  @HasMany(() => HospitalBlood)
  hospitalBloods: HospitalBlood[];

  @HasMany(() => Patient)
  patients: Patient[];
}
