import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IBloodGroup } from './types';

interface bloodGroupCreationAttrs {
  value: IBloodGroup;
}

@Table({ tableName: 'blood_group', createdAt: false, updatedAt: false })
export class BloodGroup extends Model<BloodGroup, bloodGroupCreationAttrs> {
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
  value: IBloodGroup;
}
