import { CheckIn } from '@prisma/client';
import { ICheckInsRepository } from '@/repositories/i-check-ins-repository';
interface IFetchUserCheckInsHistoryUseCaseRequest {
    userId: string
    page: number
    
}

interface FetchUserCheckInsHistoryUseCaseResponse {
   checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUserCase {
  constructor(
    private checkInsHistorysRepository: ICheckInsRepository) {

  }

  async execute(
    {
      userId,
      page

    }: IFetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsHistorysRepository.findManyByUserId(userId, page);

    return {
      checkIns
    };
  }
}