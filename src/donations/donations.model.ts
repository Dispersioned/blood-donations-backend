import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { HospitalBlood } from 'src/hospital-blood/hospital-blood.model';
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
    type: DataType.INTEGER,
  })
  userId: number;

  @ForeignKey(() => HospitalBlood)
  @Column({
    field: 'hospital_blood_id',
    type: DataType.INTEGER,
  })
  hospitalBloodId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  volume: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => HospitalBlood)
  hospitalBlood: HospitalBlood;
}
