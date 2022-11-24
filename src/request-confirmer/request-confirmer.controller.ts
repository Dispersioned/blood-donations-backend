import { Body, Controller, Post } from '@nestjs/common';
import { confirmRequestDto } from './dto/confirm-request.dto';
import { RequestConfirmerService } from './request-confirmer.service';

@Controller('request-confirmer')
export class RequestConfirmerController {
  constructor(private readonly requestConfirmerService: RequestConfirmerService) {}

  @Post()
  confirmRequest(@Body() dto: confirmRequestDto) {
    return this.requestConfirmerService.confirmRequest(dto);
  }
}
