import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BloodService } from 'src/blood/blood.service';
import { CreateHospitalBloodDto } from './dto/create-hospital-blood.dto';
import { HospitalBlood } from './hospital-blood.model';

@Injectable()
export class HospitalBloodService {
  constructor(
    @InjectModel(HospitalBlood) private readonly hospitalBloodRepository: typeof HospitalBlood,
    private readonly bloodService: BloodService
  ) {}

  async createHospitalBlood(dto: CreateHospitalBloodDto) {
    const hospitalBlood = await this.hospitalBloodRepository.create(dto);
    // TODO по факту не нужно
    await hospitalBlood.$set('hospital', dto.hospitalId);
    await hospitalBlood.$set('blood', dto.bloodId);
    return hospitalBlood;
  }

  async createBloodBank(hospitalId: number) {
    const bloods = await this.bloodService.getAll();

    const hospitalBloods = [];

    bloods.forEach(async (blood) => {
      const hb = await this.createHospitalBlood({ bloodId: blood.id, hospitalId });
      hospitalBloods.push(hb);
    });

    return hospitalBloods;
  }

  async getById(id: number) {
    const hospitalBlood = await this.hospitalBloodRepository.findOne({
      where: {
        id: id,
      },
    });
    return hospitalBlood;
  }

  async getByHospital(hospitalId: number) {
    const hospitalBlood = await this.hospitalBloodRepository.findAll({
      where: {
        hospitalId,
      },
    });
    return hospitalBlood;
  }

  async getByHospitals(hospitalsId: number[]) {
    const hospitalBloods = await this.hospitalBloodRepository.scope('withForeignKeys').findAll({
      where: {
        hospitalId: hospitalsId,
      },
    });
    return hospitalBloods;
  }

  async getExact(hospitalId: number, bloodId: number) {
    const hospitalBlood = await this.hospitalBloodRepository.findOne({
      where: {
        hospitalId,
        bloodId,
      },
    });
    return hospitalBlood;
  }
}
