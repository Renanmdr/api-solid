import { CheckIn } from '@prisma/client';
import { ICheckInsRepository } from '@/repositories/i-check-ins-repository';
import { IGymsRepository } from '@/repositories/i-gyms-repository';
import { ResourceNotFoundError } from './errors/resource-not-found.error';
interface ICheckInUseCaseRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUserCase {
  constructor(private checkInsRepository: ICheckInsRepository, private gymsRepository: IGymsRepository) {

  }

  async execute({ userId, gymId}: ICheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if(!gym){
      throw new ResourceNotFoundError();
    }

    // kdjdjddjdjjd
    
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());
    

    if(checkInOnSameDay){
      throw new Error; 
    }
    
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    });


    return {
      checkIn
    };
  }
}