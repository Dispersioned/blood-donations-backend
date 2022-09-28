import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Hospital } from 'src/hospitals/hospitals.model';
import { User } from 'src/users/users.model';

@Table({ tableName: 'patients' })
export class Patient extends Model<Patient> {
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
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Hospital)
  @Column({
    field: 'hospital_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  hospitalId: number;

  @BelongsTo(() => Hospital)
  hospital: Hospital;

  @ForeignKey(() => User)
  @Column({
    field: 'doctor_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  doctorId: number;

  @BelongsTo(() => User)
  doctor: User;
}
