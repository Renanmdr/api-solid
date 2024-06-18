import { IUsersRepository } from '@/repositories/I-users-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsErro } from './errors/user-already-exists-error';
import { User } from '@prisma/client';
interface IRegisterUseCaseRequest{
    name: string
    email: string
    password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {

  constructor(private usersRepository: IUsersRepository){}

  async execute({ name, email, password }: IRegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new  UserAlreadyExistsErro();

    }

    // const prismaUsersRepository = new PrismaUsersRepository();

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    });

    return {
      user
    };
  }

  
}