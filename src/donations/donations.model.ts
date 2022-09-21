import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { HospitalBlood } from 'src/hospital-blood/hospitals.model';
import { Role } from 'src/roles/roles.model';
import { User } from 'src/users/users.model';

interface DonationCreationAttrs {
  userId: number;
  hospitalBloodId: number;
  volume: number;
}

@Table({ tableName: 'donations' })
export class Donation extends Model<Donation, DonationCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
    type: DataType.NUMBER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => User)
  @Column({
    field: 'hospital_blood_id',
    type: DataType.NUMBER,
    allowNull: false,
  })
  hospitalBloodId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  volume: number;

  @BelongsTo(() => HospitalBlood)
  hospitalBlood: HospitalBlood;
}
