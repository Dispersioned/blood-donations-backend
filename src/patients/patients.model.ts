import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Hospital } from 'src/hospitals/hospitals.model';
import { User } from 'src/users/users.model';

@Table({
  tableName: 'patients',
  defaultScope: {
    attributes: {
      exclude: ['userId', 'hospitalId', 'doctorId'],
    },
  },
  scopes: {
    withForeignKeys: {},
  },
})
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

  @ForeignKey(() => Hospital)
  @Column({
    field: 'hospital_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  hospitalId: number;

  @ForeignKey(() => User)
  @Column({
    field: 'doctor_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  doctorId: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => Hospital)
  hospital: Hospital;

  @BelongsTo(() => User, 'doctor_id')
  doctor: User;
}
