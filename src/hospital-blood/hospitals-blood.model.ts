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
    type: DataType.STRING,
    allowNull: false,
  })
  hospitalId: string;

  @ForeignKey(() => Blood)
  @Column({
    field: 'blood_id',
    type: DataType.STRING,
    allowNull: false,
  })
  bloodId: string;

  @HasMany(() => Donation)
  donations: Donation[];

  @BelongsTo(() => Hospital)
  hospital: Hospital;
}
