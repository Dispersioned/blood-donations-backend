import { Controller, NotImplementedException, Post } from '@nestjs/common';

@Controller('transfers')
export class TransfersController {
  @Post()
  createTransfer() {
    throw new NotImplementedException('Not implemented');
  }
}
