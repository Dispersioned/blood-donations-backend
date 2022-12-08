import { Column, DataType, Model, Table } from 'sequelize-typescript';

export type IBloodGroup = '0' | 'A' | 'B' | 'AB';
export type IBloodRhFactor = '+' | '-';

interface BloodCreationAttrs {
  group: IBloodGroup;
  rhFactor: IBloodRhFactor;
}

@Table({ tableName: 'blood', timestamps: false })
export class Blood extends Model<Blood, BloodCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.ENUM('0', 'A', 'B', 'AB'),
  })
  group: IBloodGroup;

  @Column({
    type: DataType.ENUM('+', '-'),
  })
  rhFactor: IBloodRhFactor;
}
