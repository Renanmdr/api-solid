import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUserCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';


describe('Authenticate use case', () => {

  it('should be able to authenticate', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUserCase(inMemoryUsersRepository);

    await inMemoryUsersRepository.create({
      name: 'Renan',
      email: 'renan@gmail.com',
      password_hash: await hash('123456', 6)
    });

    const { user } = await sut.execute({
      email: 'renan@gmail.com',
      password: '123456'
    });

    expect(user.id).toEqual(expect.any(String));
  });

  
  it('should not be able to authenticate with wrong email', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUserCase(inMemoryUsersRepository);


    await expect(() => sut.execute({
      email: 'renan@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError);

   
  });


  it('should not be able to authenticate with wrong password', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUserCase(inMemoryUsersRepository);

    await inMemoryUsersRepository.create({
      name: 'Renan',
      email: 'renan@gmail.com',
      password_hash: await hash('123456', 6)
    });


    await expect(() => sut.execute({
      email: 'renan@gmail.com',
      password: '654321'
    })).rejects.toBeInstanceOf(InvalidCredentialsError);


  });
  


});