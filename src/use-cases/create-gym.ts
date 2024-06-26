import { Gym } from '@prisma/client';
import { IGymsRepository } from '@/repositories/i-gyms-repository';
interface ICreateGymUseCaseRequest {
    tittle: string
    description: string | null
    phone: string | null
    latitude: number
    longitude: number
}

interface CreateGymUseCaseResponse {
    gym: Gym
}

export class CreateGymUseCase {

  constructor(private gymsRepository: IGymsRepository) { }

  async execute({ 
    tittle,
    description,
    phone,
    latitude,
    longitude
  }: ICreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    
    const gym = await this.gymsRepository.create({
      tittle,
      description,
      phone,
      latitude,
      longitude
    });

    return {
      gym
    };
  }


}