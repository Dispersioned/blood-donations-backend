import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BloodService } from 'src/blood/blood.service';
import { HospitalBloodService } from 'src/hospital-blood/hospital-blood.service';
import { HospitalsService } from 'src/hospitals/hospitals.service';
import { UsersService } from 'src/users/users.service';
import { Donation } from './donations.model';
import { createDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel(Donation) private readonly donationsRepository: typeof Donation,
    private readonly bloodService: BloodService,
    private readonly usersService: UsersService,
    private readonly hospitalBloodService: HospitalBloodService,
    private readonly hospitalsService: HospitalsService
  ) {}

  async createDonation(dto: createDonationDto) {
    const user = await this.usersService.getUserById(dto.userId);
    if (!user) throw new BadRequestException('Пользователь не найден');

    const hospital = await this.hospitalsService.getById(dto.hospitalId);
    if (!hospital) throw new BadRequestException('Больница не найдена');

    const hospitalBlood = await this.hospitalBloodService.getExact(hospital.id, user.bloodId);
    const donation = await this.donationsRepository.create({ volume: dto.volume });
    await donation.$set('user', user.id);
    await donation.$set('hospitalBlood', hospitalBlood.id);
    return donation;
  }

  async getAll() {
    const donations = await this.donationsRepository.findAll();
    return donations;
  }
}
