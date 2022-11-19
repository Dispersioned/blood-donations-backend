import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BloodService } from 'src/blood/blood.service';
// import { DonationsService } from 'src/donations/donations.service';
import { CreateHospitalBloodDto } from './dto/create-hospital-blood.dto';
import { HospitalBlood } from './hospital-blood.model';

@Injectable()
export class HospitalBloodService {
  constructor(
    @InjectModel(HospitalBlood) private readonly hospitalBloodRepository: typeof HospitalBlood,
    private readonly bloodService: BloodService // private readonly donationsService: DonationsService
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

    bloods.forEach(async (blood) => {
      await this.createHospitalBlood({ bloodId: blood.id, hospitalId });
    });
  }

  async getById(id: number) {
    const hospitalBlood = await this.hospitalBloodRepository.findOne({
      where: {
        id: id,
      },
    });
    return hospitalBlood;
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

  async getAvailableVolume(hospitalBloodId: number) {
    const hospitalBlood = await this.hospitalBloodRepository.findOne({
      where: {
        id: hospitalBloodId,
      },
    });

    console.log('hospitalBlood', hospitalBlood);

    // const donations = await this.donationsService.getAllByHospitalBloodId(hospitalBlood.id);
  }

  // Don't think it's needed...
  // async getAll() {
  //   const hospitalBloods = await this.hospitalBloodRepository.findAll();
  //   return hospitalBloods;
  // }
}
