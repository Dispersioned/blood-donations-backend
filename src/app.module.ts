import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { Blood } from './blood/blood.model';
import { BloodModule } from './blood/blood.module';
import { Donation } from './donations/donations.model';
import { DonationsModule } from './donations/donations.module';
import { HospitalBlood } from './hospital-blood/hospital-blood.model';
import { HospitalBloodModule } from './hospital-blood/hospital-blood.module';
import { Hospital } from './hospitals/hospitals.model';
import { HospitalsModule } from './hospitals/hospitals.module';
import { LogsModule } from './logs/logs.module';
import { Patient } from './patients/patients.model';
import { PatientsModule } from './patients/patients.module';
import { RequestHospitalBlood } from './request-hospital-blood/request-hospital-blood.model';
import { RequestHospitalBloodModule } from './request-hospital-blood/request-hospital-blood.module';
import { Request } from './requests/requests.model';
import { RequestsModule } from './requests/requests.module';
import { Role } from './roles/roles.model';
import { RolesModule } from './roles/roles.module';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, Blood, Donation, Hospital, HospitalBlood, Patient, Request, RequestHospitalBlood],
      autoLoadModels: true,
      sync: { alter: true },
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    BloodModule,
    LogsModule,
    HospitalBloodModule,
    RequestHospitalBloodModule,
    PatientsModule,
    DonationsModule,
    RequestsModule,
    HospitalsModule,
  ],
})
export class AppModule {}
