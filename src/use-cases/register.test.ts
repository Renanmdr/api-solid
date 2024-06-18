import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsErro } from './errors/user-already-exists-error';

describe('check if it works', () => {

  it('should be able to register', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUserCase = new RegisterUseCase(inMemoryUsersRepository);

    const { user } = await registerUserCase.execute({
      name: 'Michael Jr',
      email: 'michael@exemplo.com',
      password: '123456'
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUserCase = new RegisterUseCase(inMemoryUsersRepository);

    const { user } = await registerUserCase.execute({
      name: 'Michael Jr',
      email: 'michael@exemplo.com',
      password: '123456'
    });

    const isPasswordCorrectlyHasged = await compare('123456', user.password_hash );

    expect(isPasswordCorrectlyHasged).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUserCase = new RegisterUseCase(inMemoryUsersRepository);

    await registerUserCase.execute({
      name: 'Michael Jr',
      email: 'michael@exemplo.com',
      password: '123456'
    });

    expect(() => registerUserCase.execute({
      name: 'Michael Jr',
      email: 'michael@exemplo.com',
      password: '123456'
    })).rejects.toBeInstanceOf(UserAlreadyExistsErro);

   

    
  });


});