import { Body, Controller, Get, Post } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { createDonationDto } from './dto/create-donation-dto';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post('make')
  makeDonation(@Body() dto: createDonationDto) {
    return this.donationsService.createDonation(dto);
  }

  @Get()
  getAllDonations() {
    return this.donationsService.getAll();
  }
}
