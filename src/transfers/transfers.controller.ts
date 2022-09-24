import { Body, Controller, Post } from '@nestjs/common';
import { createTransferDto } from './dto/create-transfer.dto';
import { TransfersService } from './transfers.service';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Post()
  createTransfer(@Body() dto: createTransferDto) {
    return this.transfersService.createTransfer(dto);
  }
}
