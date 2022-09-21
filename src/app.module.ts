import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { BloodGroup } from './blood-group/blood-group.model';
import { BloodGroupModule } from './blood-group/blood-group.module';
import { BloodRhFactor } from './blood-rh-factor/blood-rh-factor.model';
import { BloodRhFactorModule } from './blood-rh-factor/blood-rh-factor.module';
import { Blood } from './blood/blood.model';
import { BloodModule } from './blood/blood.module';
import { Donation } from './donations/donations.model';
import { DonationsModule } from './donations/donations.module';
import { HospitalBloodModule } from './hospital-blood/hospital-blood.module';
import { HospitalBlood } from './hospital-blood/hospital-blood.model';
import { Hospital } from './hospitals/hospitals.model';
import { HospitalsModule } from './hospitals/hospitals.module';
import { LogsModule } from './logs/logs.module';
import { PatientsModule } from './patients/patients.module';
import { RequestHospitalBloodModule } from './request-hospital-blood/request-hospital-blood.module';
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
      models: [User, Role, Blood, BloodGroup, BloodRhFactor, Donation, Hospital, HospitalBlood],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    BloodModule,
    BloodGroupModule,
    BloodRhFactorModule,
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
