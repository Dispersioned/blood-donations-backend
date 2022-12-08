import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HospitalBloodService } from 'src/hospital-blood/hospital-blood.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { DeleteHospitalDto } from './dto/delete-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { Hospital } from './hospitals.model';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectModel(Hospital) private readonly hospitalsRepository: typeof Hospital,
    private readonly hospitalBloodService: HospitalBloodService
  ) {}

  async createHospital(dto: CreateHospitalDto) {
    const hospital = await this.hospitalsRepository.create(dto);
    await this.hospitalBloodService.createBloodBank(hospital.id);
    return hospital;
  }

  async getById(id: number) {
    const hospital = await this.hospitalsRepository.findOne({
      where: {
        id,
      },
    });
    return hospital;
  }

  async getAll() {
    const hospitals = await this.hospitalsRepository.findAll();
    return hospitals;
  }

  async updateHospital(dto: UpdateHospitalDto) {
    const hospital = await this.hospitalsRepository.findByPk(dto.hospitalId);

    hospital.set('name', dto.name);
    hospital.set('location', dto.location);
    await hospital.save();
    return hospital;
  }

  async deleteHospital(dto: DeleteHospitalDto) {
    const hospital = await this.hospitalsRepository.findByPk(dto.hospitalId);

    const hospitalBloods = await this.hospitalBloodService.getByHospital(hospital.id);

    for (const HB of hospitalBloods) await HB.destroy();

    await hospital.destroy();
    return;
  }
}
