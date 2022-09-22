import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Blood } from 'src/blood/blood.model';
import { Donation } from 'src/donations/donations.model';
import { Hospital } from 'src/hospitals/hospitals.model';

@Table({ tableName: 'hospital_blood' })
export class HospitalBlood extends Model<HospitalBlood> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Hospital)
  @Column({
    field: 'hospital_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  hospitalId: number;

  @ForeignKey(() => Blood)
  @Column({
    field: 'blood_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  bloodId: number;

  @BelongsTo(() => Hospital)
  hospital: Hospital;

  @HasMany(() => Donation)
  donations: Donation[];

  // @HasMany(() => RequestHospitalBlood)
  // requestHospitalBlood: RequestHospitalBlood[];
}
