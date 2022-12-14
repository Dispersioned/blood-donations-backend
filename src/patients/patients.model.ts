import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Hospital } from 'src/hospitals/hospitals.model';
import { User } from 'src/users/users.model';

@Table({
  tableName: 'patients',
  defaultScope: {
    attributes: {
      exclude: ['userId', 'hospitalId', 'doctorId'],
    },
    include: ['user', 'hospital', 'doctor'],
  },
  scopes: {
    withForeignKeys: {
      include: ['user', 'hospital', 'doctor'],
    },
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

  @BelongsTo(() => User, 'userId')
  user: User;

  @BelongsTo(() => Hospital)
  hospital: Hospital;

  @BelongsTo(() => User, 'doctorId')
  doctor: User;
}
