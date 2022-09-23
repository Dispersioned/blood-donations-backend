import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateHospitalBloodDto } from './dto/create-hospital-blood-dto';
import { HospitalBlood } from './hospital-blood.model';

@Injectable()
export class HospitalBloodService {
  constructor(@InjectModel(HospitalBlood) private readonly hospitalBloodRepository: typeof HospitalBlood) {}

  async createHospitalBlood(dto: CreateHospitalBloodDto) {
    const hospitalBlood = await this.hospitalBloodRepository.create(dto);
    return hospitalBlood;
  }

  // Don't think it's needed...
  // async getAll() {
  //   const hospitalBloods = await this.hospitalBloodRepository.findAll();
  //   return hospitalBloods;
  // }
}
