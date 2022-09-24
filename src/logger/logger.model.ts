import { Column, DataType, Model, Table } from 'sequelize-typescript';

// interface HospitalCreationAttrs {
//   name: string;
//   location: string;
// }

@Table({ tableName: 'logger' })
export class Logger extends Model<Logger> {
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
