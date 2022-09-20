import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles/roles.model';
import { RolesModule } from './roles/roles.module';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserRoles } from './roles/roles-user.model';
import { BloodModule } from './blood/blood.module';
import { Blood } from './blood/blood.model';
import { BloodGroupModule } from './bloodGroup/bloodGroup.module';
import { bloodGroup } from './bloodGroup/bloodGroup.model';

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
      models: [User, Role, UserRoles, Blood, bloodGroup],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    BloodModule,
    BloodGroupModule,
  ],
})
export class AppModule {}
