import { IUsersRepository } from '@/repositories/I-users-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsErro } from './errors/user-already-exists-error';
interface IRegisterUseCase{
    name: string
    email: string
    password: string
}

export class RegisterUseCase {

  constructor(private usersRepository: IUsersRepository){}

  async execute({ name, email, password }: IRegisterUseCase) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new  UserAlreadyExistsErro();

    }

    // const prismaUsersRepository = new PrismaUsersRepository();

    await this.usersRepository.create({
      name,
      email,
      password_hash
    });
  }

  
}