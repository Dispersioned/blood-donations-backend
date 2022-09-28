import { Body, Controller, Post } from '@nestjs/common';
import { createRequestDto } from './dto/create-request.dto';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  createRequest(@Body() dto: createRequestDto) {
    return this.requestsService.createRequest(dto);
  }
}
