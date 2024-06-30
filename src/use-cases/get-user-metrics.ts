import { ICheckInsRepository } from '@/repositories/i-check-ins-repository';

interface IGetUserMetricsUseCaseRequest {
    userId: string
}

interface GetUserMetricsUseCaseResponse {
    checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(
        private checkInsHistorysRepository: ICheckInsRepository) {

  }

  async execute(
    {
      userId

    }: IGetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsHistorysRepository.countByUserId(userId);

    return {
      checkInsCount
    };
  }
}