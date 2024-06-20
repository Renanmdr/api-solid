import { beforeEach, describe, expect, it } from 'vitest';
import { CheckInUserCase } from './check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';

let inMemoryUsersRepository: InMemoryCheckInsRepository;
let sut: CheckInUserCase;

describe('Check In use case', () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUserCase(inMemoryUsersRepository);
  });

  it('should be able to check in', async () => {

    const {checkIn} = await sut.execute({
      gymId: '123',
      userId: '123'
    });


    expect(checkIn.id).toEqual(expect.any(String));
  });


    


   



});