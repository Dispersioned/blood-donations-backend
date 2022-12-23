import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Includeable } from 'sequelize';
import { DonationsService } from 'src/donations/donations.service';
import { HospitalBloodService } from 'src/hospital-blood/hospital-blood.service';
import { Patient } from 'src/patients/patients.model';
import { PatientsService } from 'src/patients/patients.service';
import { TransfersService } from 'src/transfers/transfers.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { Request } from './requests.model';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(Request) private readonly requestRepository: typeof Request,
    private readonly patientService: PatientsService,
    private readonly hospitalBloodService: HospitalBloodService,
    private readonly donationsService: DonationsService,
    private readonly transfersService: TransfersService
  ) {}

  async createRequest(dto: CreateRequestDto) {
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

  async getByPatient(patientId: number) {
    const requests = await this.requestRepository.findAll({
      include: [
        {
          model: Patient,
          where: {
            id: patientId,
          },
        },
      ],
    });
    return requests;
  }

  async getById(id: number, include: Includeable | Includeable[]) {
    const request = await this.requestRepository.findOne({
      where: { id },
      include,
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

    const volumeData = hospitalBloods.map(async (hb) => {
      const donatedVolume =
        (await this.donationsService.getBloodVolume({
          hospitalBloodId: hb.id,
        })) || 0;
      const transferredVolume =
        (await this.transfersService.getBloodVolume({
          hospitalBloodId: hb.id,
        })) || 0;

      //* console.log('donatedVolume', donatedVolume, hb.hospitalId);

      const available = donatedVolume - transferredVolume;

      return {
        hospitalBlood: hb,
        available,
      };
    });

    const mapHBId2Volume = {};
    for (const data of await Promise.all(volumeData)) {
      mapHBId2Volume[data.hospitalBlood.id] = data.available;
    }
    //* console.log('mapHBId2Volume', mapHBId2Volume);

    const requestsWithStatus = requests.map((request) => {
      const correctHB = hospitalBloods.find(
        (hb) => hb.bloodId === request.patient.user.blood.id && hb.hospitalId === request.patient.hospital.id
      );

      return {
        request,
        availableVolume: mapHBId2Volume[correctHB.id],
      };
    });

    return requestsWithStatus;
  }
}
