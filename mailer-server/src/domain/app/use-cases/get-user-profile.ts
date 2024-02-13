import { Either, left, right } from "@/core/either.ts"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts"
import { UsersRepository } from "../repositories/users-repository.ts"
import { User } from "@/domain/enterprise/user.ts"

interface GetUserProfileUseCaseRequest {
  id: string
}

type GetUserProfileUseCaseResponse = Either<ResourceNotFoundError, {
  user: User
}>

export class GetUserProfileUseCase {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({ id }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    return right({
      user
    })
  }
}