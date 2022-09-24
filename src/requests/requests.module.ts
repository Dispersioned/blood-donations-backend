import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Request } from './requests.model';

@Module({
  providers: [RequestsService],
  imports: [SequelizeModule.forFeature([Request])],
  controllers: [RequestsController],
  exports: [RequestsService],
})
export class RequestsModule {}
