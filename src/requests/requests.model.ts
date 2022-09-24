import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Blood } from 'src/blood/blood.model';
import { Patient } from 'src/patients/patients.model';
import { RequestHospitalBlood } from 'src/request-hospital-blood/request-hospital-blood.model';
import { RequestHospitalBloodModule } from 'src/request-hospital-blood/request-hospital-blood.module';

interface RequestCreationAttrs {
  patientId: string;
  bloodId: string;
  volume: number;
}

@Table({ tableName: 'requests' })
export class Request extends Model<Request, RequestCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Patient)
  @Column({
    field: 'patient_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  patientId: number;

  @ForeignKey(() => Blood)
  @Column({
    field: 'blood_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  bloodId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  volume: number;

  @Column({
    type: DataType.ENUM('fulfilled', 'pending'),
    allowNull: false,
  })
  status: 'fulfilled' | 'pending';

  @BelongsTo(() => Patient)
  patient: Patient;

  @BelongsTo(() => Blood)
  blood: Blood;

  @HasMany(() => RequestHospitalBlood)
  requestHospitalBloods: RequestHospitalBloodModule[];
}
