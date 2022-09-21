import { Column, DataType, Model, Table } from 'sequelize-typescript';

// interface HospitalCreationAttrs {
//   name: string;
//   location: string;
// }

@Table({ tableName: 'logs' })
export class Logs extends Model<Logs> {
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
  action: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  data: number;
}
