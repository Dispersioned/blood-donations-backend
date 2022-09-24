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
    await hospitalBlood.$set('hospital', dto.hospitalId);
    await hospitalBlood.$set('blood', dto.bloodId);
    return hospitalBlood;
  }

  async createBloodBank(hospitalId: number) {
    const bloods = await this.bloodService.getAll();

    bloods.forEach(async (blood) => {
      await this.createHospitalBlood({ bloodId: blood.id, hospitalId });
    });
  }

  async findById(id: number) {
    const hospitalBlood = await this.hospitalBloodRepository.findOne({
      where: {
        id: id,
      },
    });
    return hospitalBlood;
  }

  async findExact(hospitalId: number, bloodId: number) {
    const hospitalBlood = await this.hospitalBloodRepository.findOne({
      where: {
        hospitalId,
        bloodId,
      },
    });
    return hospitalBlood;
  }

  // Don't think it's needed...
  // async getAll() {
  //   const hospitalBloods = await this.hospitalBloodRepository.findAll();
  //   return hospitalBloods;
  // }
}
