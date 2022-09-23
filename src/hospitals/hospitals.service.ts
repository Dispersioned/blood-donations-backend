import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateHospitalDto } from './dto/create-hospital-dto';
import { Hospital } from './hospitals.model';

@Injectable()
export class HospitalsService {
  constructor(@InjectModel(Hospital) private readonly hospitalsRepository: typeof Hospital) {}

  async createHospital(dto: CreateHospitalDto) {
    console.log(dto);
    const hospital = await this.hospitalsRepository.create(dto);
    return hospital;
  }
}
