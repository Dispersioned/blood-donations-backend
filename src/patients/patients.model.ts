import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { Hospital } from 'src/hospitals/hospitals.model';
import { Request } from 'src/requests/requests.model';
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

  @HasOne(() => User)
  user: User;

  @HasMany(() => Request)
  requests: Request[];

  @BelongsTo(() => Hospital)
  hospital: Hospital;
}
