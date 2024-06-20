import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsErro } from './errors/user-already-exists-error';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('register use case', () => {
  
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(inMemoryUsersRepository);
  });

  it('should be able to register', async () => {
    

    const { user } = await sut.execute({
      name: 'Michael Jr',
      email: 'michael@exemplo.com',
      password: '123456'
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    

    const { user } = await sut.execute({
      name: 'Michael Jr',
      email: 'michael@exemplo.com',
      password: '123456'
    });

    const isPasswordCorrectlyHasged = await compare('123456', user.password_hash );

    expect(isPasswordCorrectlyHasged).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    

    await sut.execute({
      name: 'Michael Jr',
      email: 'michael@exemplo.com',
      password: '123456'
    });

    await expect(() => sut.execute({
      name: 'Michael Jr',
      email: 'michael@exemplo.com',
      password: '123456'
    })).rejects.toBeInstanceOf(UserAlreadyExistsErro);

   

    
  });


});