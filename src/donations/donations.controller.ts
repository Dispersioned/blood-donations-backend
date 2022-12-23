import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post('make')
  makeDonation(@Body() dto: CreateDonationDto) {
    return this.donationsService.createDonation(dto);
  }

  @Get()
  getAllDonations() {
    return this.donationsService.getAll();
  }

  @Get(':userId')
  getUserDonations(@Param('userId') id) {
    return this.donationsService.getUserDonations(id);
  }
}
