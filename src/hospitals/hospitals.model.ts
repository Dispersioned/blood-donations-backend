import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface HospitalCreationAttrs {
  name: string;
  location: string;
}

@Table({ tableName: 'hospitals' })
export class Hospital extends Model<Hospital, HospitalCreationAttrs> {
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;

  // @ForeignKey(() => Role)
  // @Column({
  //   field: 'role_id',
  //   type: DataType.INTEGER,
  // })
  // roleId: number;

  // @BelongsTo(() => Role)
  // role: Role;
}
