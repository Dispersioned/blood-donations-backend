import { Column, DataType, Model, Table } from 'sequelize-typescript';

// interface BloodCreationAttrs {

// }

@Table({ tableName: 'blood' })
export class Blood extends Model<Blood> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  group: '' | 'A' | 'B' | 'AB';
  rhFactor: '+' | '-';
}
