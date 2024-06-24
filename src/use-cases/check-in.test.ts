import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInUserCase } from './check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';

let inMemoryUsersRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUserCase;

describe('Check In use case', () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUserCase(inMemoryUsersRepository, gymsRepository);

    gymsRepository.items.push({
      id: '123',
      tittle: 'Gym Node',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    
    const {checkIn} = await sut.execute({
      gymId: '123',
      userId: '123',
      userLatitude: 0,
      userLongitude: 0,
    });


    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    
    await sut.execute({
      gymId: '123',
      userId: '123',
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(() => sut.execute({
      gymId: '123',
      userId: '123',
      userLatitude: 0,
      userLongitude: 0,
    })).rejects.toBeInstanceOf(Error);


    
  });


  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: '123',
      userId: '123',
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2022, 0, 22, 8, 0, 0));

    const  {checkIn} = await sut.execute({
      gymId: '123',
      userId: '123',
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));

  });

  it('should not be able to check in on distant gym', async () => {

    gymsRepository.items.push({
      id: 'gym-02',
      tittle: 'Gym Node',
      description: '',
      phone: '',
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
    });

    await expect(() => sut.execute({
      gymId: 'gym-02',
      userId: '123',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })).rejects.toBeInstanceOf(Error);


  });

});