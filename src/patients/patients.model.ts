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

  @ForeignKey(() => Hospital)
  @Column({
    field: 'hospital_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  hospitalId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Hospital)
  hospital: Hospital;
}
