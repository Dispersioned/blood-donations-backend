import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';

interface UserCreationAttrs {
  username: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
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
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ForeignKey(() => Role)
  @Column({
    field: 'role_id',
    type: DataType.INTEGER,
  })
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;
}
