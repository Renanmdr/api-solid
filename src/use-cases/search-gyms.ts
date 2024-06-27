import { Gym } from '@prisma/client';
import { IGymsRepository } from '@/repositories/i-gyms-repository';
interface ISearchGymsUseCaseRequest {
    query: string
    page: number
    
}

interface SearchGymsUseCaseResponse {
    gyms: Gym[]
}

export class SearchGymsseCase {

  constructor(private gymsRepository: IGymsRepository) { }

  async execute({
    query,
    page
  }: ISearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {

    const gyms = await this.gymsRepository.searchMany(query, page);

    return {
      gyms
    };
  }


}
