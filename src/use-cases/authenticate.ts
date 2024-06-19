import { IUsersRepository } from '@/repositories/I-users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';
interface IAuthenticateUserRequest {
    email: string
    password: string
}

interface AuthenticateUserCaseResponse{
    user: User
}

export class AuthenticateUserCase {
  constructor(private usersRepository: IUsersRepository){
        
  }

  async execute({email, password}: IAuthenticateUserRequest): Promise<AuthenticateUserCaseResponse>{
    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if(!doesPasswordMatches){
      throw new InvalidCredentialsError();
    }

    return {
      user
    };
  }
}