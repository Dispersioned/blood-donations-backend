import { Controller } from '@nestjs/common';
import { TransfersService } from './transfers.service';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  // @Post()
  // createTransfer(@Body() dto: createTransferDto) {
  //   return this.transfersService.createTransfer(dto);
  // }
}
