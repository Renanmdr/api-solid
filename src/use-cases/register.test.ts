import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';

describe('check if it works', () => {
  it('should hash user password upon registration', async () => {
    const registerUserCase = new RegisterUseCase({
      async  findByEmail(email){
        return null;
      },

      async create(data){
        return {
          id: 'user-01',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date()
        };
      }

    });

    const { user } = await registerUserCase.execute({
      name: 'Michael Jr',
      email: 'michael@exemplo.com',
      password: '123456'
    });

    const isPasswordCorrectlyHasged = await compare('123456', user.password_hash );

    expect(isPasswordCorrectlyHasged).toBe(true);
  });


});