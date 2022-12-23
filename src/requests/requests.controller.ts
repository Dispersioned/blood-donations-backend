import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Get()
  getAllRequestsWithStatus() {
    return this.requestsService.getAllRequestsWithStatus();
  }

  @Post()
  createRequest(@Body() dto: CreateRequestDto) {
    return this.requestsService.createRequest(dto);
  }
}
