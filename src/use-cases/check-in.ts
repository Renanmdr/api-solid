import { CheckIn } from '@prisma/client';
import { ICheckInsRepository } from '@/repositories/i-check-ins-repository';
interface ICheckInUseCaseRequest {
    userId: string
    gymId: string
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUserCase {
  constructor(private checkInsRepository: ICheckInsRepository) {

  }

  async execute({ userId, gymId}: ICheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    });


    return {
      checkIn
    };
  }
}