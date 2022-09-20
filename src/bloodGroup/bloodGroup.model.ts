import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IBloodGroup } from './types';

interface bloodGroupCreationAttrs {
  name: IBloodGroup;
}

@Table({ tableName: 'blood_group', createdAt: false, updatedAt: false })
export class bloodGroup extends Model<bloodGroup, bloodGroupCreationAttrs> {
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
  name: IBloodGroup;
}
