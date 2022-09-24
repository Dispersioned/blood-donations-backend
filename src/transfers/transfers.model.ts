import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { HospitalBlood } from 'src/hospital-blood/hospital-blood.model';
import { Request } from 'src/requests/requests.model';

interface TransferCreationAttrs {
  requestId: number;
  hospitalBloodId: number;
  volume: number;
}

@Table({ tableName: 'transfers' })
export class Transfer extends Model<Transfer, TransferCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Request)
  @Column({
    field: 'request_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  requestId: number;

  @ForeignKey(() => HospitalBlood)
  @Column({
    field: 'hospital_blood_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  hospitalBloodId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  volume: number;

  @BelongsTo(() => Request)
  request: Request;

  @BelongsTo(() => HospitalBlood)
  hospitalBlood: HospitalBlood;
}
