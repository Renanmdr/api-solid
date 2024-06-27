import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsseCase } from './search-gyms';

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: SearchGymsseCase;

describe('Search gyms use case', () => {

  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsseCase(inMemoryGymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await inMemoryGymsRepository.create({
      tittle: 'Js Gym',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0 
    });

    await inMemoryGymsRepository.create({
      tittle: 'node Gym',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0 
    });

    const { gyms} = await sut.execute({
      query: 'Js',
      page: 1

    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ tittle: 'Js Gym' }),
      
    ]);
  });

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        tittle: `Typescript Gym-${i}`,
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0 
      });
    }



    const { gyms } = await sut.execute({
      query: 'Typescript',
      page: 2

    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ tittle: 'Typescript Gym-21' }),
      expect.objectContaining({ tittle: 'Typescript Gym-22' })
    ]);
  });

});