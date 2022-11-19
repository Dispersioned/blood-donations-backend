import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DonationsService } from 'src/donations/donations.service';
import { HospitalBloodService } from 'src/hospital-blood/hospital-blood.service';
import { PatientsService } from 'src/patients/patients.service';
import { createRequestDto } from './dto/create-request.dto';
import { Request } from './requests.model';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(Request) private readonly requestRepository: typeof Request,
    private readonly patientService: PatientsService,
    private readonly hospitalBloodService: HospitalBloodService,
    private readonly donationsService: DonationsService
  ) {}

  async createRequest(dto: createRequestDto) {
    const patient = await this.patientService.getPatientById(dto.patientId);

    if (!patient) throw new BadRequestException('Пациент не найден');

    const request = await this.requestRepository.create({
      patientId: patient.id,
      bloodId: patient.user.blood.id,
      volume: dto.volume,
      status: 'PENDING',
    });
    return request;
  }

  async getById(id: number) {
    const request = await this.requestRepository.findOne({
      where: { id },
    });
    return request;
  }

  async getAllRequests() {
    const requests = await this.requestRepository.findAll();
    return requests;
  }

  async getAllRequestsWithStatus() {
    const requests = await this.requestRepository.findAll();

    //* для каждого реквеста нужно узнать объем крови

    const hospitalsId = Array.from(new Set(requests.map((request) => request.patient.hospital.id)));
    const hospitalBloods = await this.hospitalBloodService.getByHospitals(hospitalsId);

    console.log(
      'hospitalBloods',
      hospitalBloods.map((v) => v.id)
    );

    hospitalBloods.forEach(async (hb) => {
      const availableVolume =
        (await this.donationsService.getBloodVolume({
          hospitalBloodId: hb.id,
        })) || 0;

      console.log('availableVolume :>> ', availableVolume);
    });

    // requests.forEach(async (request) => {
    //   const hospitalBlood = await this.hospitalBloodService.getExact(
    //     request.patient.hospital.id,
    //     request.patient.user.id
    //   );

    //   const donations = await this.donationsService.getAllByHospitalBloodId(hospitalBlood.id);
    // });

    // console.log('requests :>> ', requests);
    return requests;
  }
}
