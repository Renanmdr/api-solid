import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';

import { FetchUserCheckInsHistoryUserCase } from './fetch-user-check-ins-history';

let inMemoryUsersRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUserCase;

describe('Fetch User check-in history use case', () => {

  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUserCase(inMemoryUsersRepository);
  });

  it('should be able to fetch check-in history', async () => {
    await inMemoryUsersRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    });

    await inMemoryUsersRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    });

    const  {checkIns} = await sut.execute({
      userId: 'user-01',
      page: 1
      
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id: 'gym-01'}),
      expect.objectContaining({gym_id: 'gym-02'})
    ]);
  });

  it('should be able to fetch check-in history', async () => {
    for(let i = 1; i <= 22; i++ ){
      await inMemoryUsersRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01'
      });
    }

   

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2
      
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' })
    ]);
  });

});