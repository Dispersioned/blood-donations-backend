import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { BloodRhFactor } from './blood-rh-factor/blood-rh-factor.model';
import { BloodRhFactorModule } from './blood-rh-factor/blood-rh-factor.module';
import { Blood } from './blood/blood.model';
import { BloodModule } from './blood/blood.module';
import { BloodGroup } from './bloodGroup/bloodGroup.model';
import { BloodGroupModule } from './bloodGroup/bloodGroup.module';
import { UserRoles } from './roles/roles-user.model';
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
      models: [User, Role, UserRoles, Blood, BloodGroup, BloodRhFactor],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    BloodModule,
    BloodGroupModule,
    BloodRhFactorModule,
  ],
})
export class AppModule {}
