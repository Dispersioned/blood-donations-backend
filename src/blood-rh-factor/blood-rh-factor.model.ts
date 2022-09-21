import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IBloodRhFactor } from './types';

@Table({ tableName: 'blood_rh_factor', createdAt: false, updatedAt: false })
export class BloodRhFactor extends Model<BloodRhFactor> {
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
  value: IBloodRhFactor;
}
