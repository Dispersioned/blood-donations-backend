import { Module } from '@nestjs/common';
import { HospitalBloodModule } from 'src/hospital-blood/hospital-blood.module';
import { RequestsModule } from 'src/requests/requests.module';
import { TransfersModule } from 'src/transfers/transfers.module';
import { RequestConfirmerController } from './request-confirmer.controller';
import { RequestConfirmerService } from './request-confirmer.service';

@Module({
  controllers: [RequestConfirmerController],
  imports: [RequestsModule, TransfersModule, HospitalBloodModule],
  providers: [RequestConfirmerService],
  exports: [RequestConfirmerService],
})
export class RequestConfirmerModule {}
