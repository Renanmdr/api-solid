import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { GetUserProfileUserCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUserCase;

describe('Get user profile use case', () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUserCase(inMemoryUsersRepository);
  });

  it('should be able to get user profile', async () => {

    const createdUser =   await inMemoryUsersRepository.create({
      name: 'Renan',
      email: 'renan@gmail.com',
      password_hash: await hash('123456', 6)
    });

    const { user } = await sut.execute({
      userId: createdUser.id
    });

    expect(user.name).toEqual('Renan');
  });


  it('should not be able to get user profile with wrong id', async () => {

    await inMemoryUsersRepository.create({
      name: 'Renan',
      email: 'renan@gmail.com',
      password_hash: await hash('123456', 6)
    });

    

    await expect(() => sut.execute({
      userId: 'non-existing-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

});