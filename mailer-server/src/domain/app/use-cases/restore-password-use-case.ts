import { Either, left, right } from "@/core/either.ts"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts"
import { UsersRepository } from "../repositories/users-repository.ts"

interface RestorePasswordUseCaseRequest {
  email: string
  password: string
}

type RestorePasswordUseCaseResponse = Either<ResourceNotFoundError, null>

export class RestorePasswordUseCase {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({ email, password }: RestorePasswordUseCaseRequest): Promise<RestorePasswordUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    user.password = password

    return right(null)
  } 
}