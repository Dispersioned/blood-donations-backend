import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/users.model';

export type IRoleName = 'DONOR' | 'PATIENT' | 'DOCTOR' | 'ADMIN';

interface RoleCreationAttrs {
  value: IRoleName;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
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
  value: IRoleName;

  @HasMany(() => User)
  users: User[];
}
