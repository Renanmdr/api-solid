import { IUsersRepository } from '@/repositories/I-users-repository';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found.error';
interface IGetUserProfileUserCaseRequest {
    userId: string
   
}

interface IGetUserProfileUserCaseResponse {
    user: User
}

export class GetUserProfileUserCase {
  constructor(private usersRepository: IUsersRepository) {

  }

  async execute({ userId }: IGetUserProfileUserCaseRequest): Promise<IGetUserProfileUserCaseResponse> {
    
    
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user
    };
  }
}