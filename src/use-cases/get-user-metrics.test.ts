import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { GetUserMetricsUseCase } from './get-user-metrics';

let inMemoryUsersRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe('Get user metrics use case', () => {

  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(inMemoryUsersRepository);
  });

  it('should be able to to get check-ins count from metrics', async () => {
    await inMemoryUsersRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    });

    await inMemoryUsersRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    });

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',

    });

    expect(checkInsCount).toEqual(2);
    
  });

});